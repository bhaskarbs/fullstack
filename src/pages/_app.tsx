import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange, query } from '@urql/exchange-graphcache'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql'
import { betterUpdateQuery } from './betterUpdateQuery'

const client = createClient({ url: 'http://localhost:4000/graphql', 
fetchOptions:{
  credentials: "include"
},
exchanges: [dedupExchange, cacheExchange({
  updates: {
    Mutation: {
      logout: (_result, args, cache, info) => {
        betterUpdateQuery<LogoutMutation, MeQuery>(
          cache,
          {query: MeDocument},
          _result,
          () => ({me: null})
        )
      },
      login: (_result, args, cache, info) => {
        betterUpdateQuery<LoginMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if(result.login.errors) {
              return query
            } else {
              return {
                me: result.login.user
              }
            }
          }
        )
      },
      register: (_result, args, cache, info) => {
        betterUpdateQuery<RegisterMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if(result.register.errors) {
              return query
            } else {
              return {
                me: result.register.user
              }
            }
          }
        )
      }
    }
  }
}), fetchExchange]
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client} >
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp

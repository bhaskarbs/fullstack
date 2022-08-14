import React from 'react'
import { Box, Button, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({ }) => {
    const [{ data, fetching }] = useMeQuery({
        pause: isServer()
    })
    const [{fetching: logoutFetching}, logout] = useLogoutMutation()
    let body = null
    if (fetching) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link mr={2}>Register</Link>
                </NextLink>
            </>
        )
        // body = null
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link mr={2}>Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box>{data.me.id}</Box>
                <Button variant='link' onClick={() => {
                    logout()
                }}
                isLoading={logoutFetching}
                >Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex bg="tomato" p={4}>
            <Box ml={"auto"} mr={2}>
                {body}
            </Box>
        </Flex>
    )
}
import React from 'react'
import { Form, Formik } from 'formik'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {

}

// const REGISTER_MUT = `
// mutation Register($username: String!, $password: String!) {
//     register (options: {username: $username, password: $password}) {
//         errors {
//             field
//             message
//         }
//         user {
//             id
//             username
//         }
//     }
// }
// `

const Register: React.FC<registerProps> = ({ }) => {
    // const [, register] = useMutation(REGISTER_MUT)
    const router = useRouter()
    const [, register] = useRegisterMutation()
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }} onSubmit={async (values, { setErrors }) => {
                // return register(values)
                const response = await register(values)
                if (response.data.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors))
                } else if (response.data.register.user) {
                    router.push("/")
                }
            }}>
                {({ values, handleChange, errors }) => (
                    <Form>
                        <FormControl>
                            <FormLabel>User Name</FormLabel>
                            <Input value={values.username} onChange={handleChange} id='username' placeholder='username' />
                            <div>{errors.username}</div>
                            <FormErrorMessage>{errors.username}ddd</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input value={values.password} onChange={handleChange} id='password' placeholder='password' type='password' />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                        </FormControl>
                        <button type='submit'> Register </button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register
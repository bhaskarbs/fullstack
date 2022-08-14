import React from 'react'
import { Form, Formik } from 'formik'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { useMutation } from 'urql';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';


const Login: React.FC<{}> = ({ }) => {
    // const [, register] = useMutation(REGISTER_MUT)
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }} onSubmit={async (values, { setErrors }) => {
                // return register(values)
                const response = await login(values)
                if (response.data.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                } else if (response.data.login.user) {
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
                        <button type='submit'> Login </button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Login
/* Core */
import React from 'react';
import {
    gql,
    useMutation,
    useApolloClient,
    ApolloClient,
} from '@apollo/client';

/* Instruments */
import { LoginForm, Loading } from '../components';
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
    mutation login($email: String!) {
        login(email: $email)
    }
`;

export default function Login() {
    const client: ApolloClient<any> = useApolloClient();

    const [login, { data }] = useMutation<
        LoginTypes.login,
        LoginTypes.loginVariables
    >(LOGIN_USER, {
        onCompleted({ login }) {
            localStorage.setItem('token', login as string);
            client.writeData({ data: { isLoggedIn: true } });
        },
    });


    return <LoginForm login={login} />;
}

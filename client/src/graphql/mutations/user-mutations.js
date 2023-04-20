import {gql} from "@apollo/client";

export const LOGIN = gql`
    mutation login($input: AuthInput!){
        login(authInput: $input){
            user {
            nickname,
            id
            }, refreshToken, accessToken
        }
    }
`

export const REGISTRATION = gql`
    mutation registration($input: AuthInput!){
        registration(authInput: $input){
            user {
            nickname,
            id
            }, refreshToken, accessToken
        }
    }
`

export const LOGOUT_MUTATION = gql`
    mutation logout($input: String!){
        logout(refreshToken: $input)
    }
`

export const REFRESH = gql`
    mutation refresh($input: String!){
        refresh(refreshToken: $input){
            user {
                nickname,
                id
            }, refreshToken, accessToken
        }
    }
`
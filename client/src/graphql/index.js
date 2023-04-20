import {ApolloClient, createHttpLink, from, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import {REFRESH} from "./mutations/user-mutations";
import {RetryLink} from "@apollo/client/link/retry";

export const GRAPHQL_USERS_API_URL = 'http://localhost:5000/graphql/users'
export const GRAPHQL_PRIVATE_API_URL = 'http://localhost:5000/graphql/operator'

export const usersClient = new ApolloClient({
    uri: GRAPHQL_USERS_API_URL,
    cache: new InMemoryCache()
})

function retryLink(refreshFailCallback) {
    return new RetryLink({
        attempts: {
            max: 2,
            retryIf: async (error, operation) => {
                if (error && error.response && error.response.status === 401) {
                    try {
                        const {data} = await usersClient.mutate({
                            mutation: REFRESH,
                            variables: {
                                input: localStorage.getItem("refreshToken")
                            }
                        })
                        if(!data.errors){
                            localStorage.setItem("refreshToken", data.refresh.refreshToken)
                            localStorage.setItem("accessToken", data.refresh.accessToken)
                        }else{
                            refreshFailCallback(data.errors)
                            return false
                        }

                        operation.setContext((prev) => {
                            const token = localStorage.getItem('accessToken');

                            return {
                                headers:{
                                    ...prev.headers,
                                    authorization: token ? `Bearer ${token}` : "",
                                }
                            }
                        })
                        return true
                    } catch (e) {
                        refreshFailCallback(e)
                        return false
                    }
                }
                return false
            }
        }
    })
}

const httpPrivateLink = createHttpLink({
    uri: GRAPHQL_PRIVATE_API_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const privateClient = (refreshFailCallback) =>
    new ApolloClient({
    link: from([
        authLink,
        retryLink(refreshFailCallback),
        httpPrivateLink
    ]),
    cache: new InMemoryCache(),
    defaultOptions:{
        watchQuery:{
            fetchPolicy: 'network-only'
        },
    }
})
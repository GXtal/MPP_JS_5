import {createContext, useEffect, useReducer} from "react"
import {AuthReducer, INITIAL_STATE} from "../redux/AuthReducer";
import {useMutation} from "@apollo/client";
import {LOGIN, LOGOUT_MUTATION, REGISTRATION} from "../graphql/mutations/user-mutations";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    const onAuth = (userData) => {
        localStorage.setItem("accessToken", userData.accessToken)
        localStorage.setItem("refreshToken", userData.refreshToken)
        dispatch({type: "LOGIN_SUCCESS", payload: userData.user})
    }

    const onError = (error) => {
        dispatch({type: "LOGIN_FAILURE", payload: error.graphQLErrors[0]})
    }

    const [loginMutation] = useMutation(LOGIN, {
        onError: onError,
        onCompleted: data => onAuth(data.login)
    })

    const [registrationMutation] = useMutation(REGISTRATION, {
        onError: onError,
        onCompleted: data => onAuth(data.registration)
    })

    const [logoutMutation] = useMutation(LOGOUT_MUTATION)

    const login = (credentials) => {
        dispatch({type: "LOGIN_START"})
        console.log(credentials);
        return loginMutation({variables:{
            input: credentials
        }})
    }

    const registration = (credentials) => {
        if(credentials.confirmPassword !== credentials.password){
            dispatch({type: "LOGIN_FAILURE", payload: new Error("Passwords are not equal")})
            return null
        }
        else{
            dispatch({type: "LOGIN_START"})
            return registrationMutation({variables:{
                    input: {nickname: credentials.nickname, password: credentials.password, isAdmin: false}
                }})
        }
    }

    const logout = async () => {
        dispatch({type: 'LOGOUT'})
        try {
            await logoutMutation({variables:{
                    input: localStorage.getItem("refreshToken")
                }})
        }catch (e) {
            console.log(e)
        }finally {
            navigate("/login")
        }

    }

    const navigate = useNavigate()


    const loginFail = (error) => {
        dispatch({type: "LOGIN_FAILURE", payload: error})
        navigate("/login")
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user:state.user,
                loading: state.loading,
                error:state.error,
                dispatch,
                login,
                registration,
                logout,
                loginFail}
            }>
            {children}
        </AuthContext.Provider>
    )
}
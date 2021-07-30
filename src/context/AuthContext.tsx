import React, { createContext, useReducer } from "react";
import cafeApi from "../api/cafeApi";
import { Usuario, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContexProps = {
    errorMessege: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticaded' | 'not authenticaded';
    signUp: () => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState  = {
    errorMessege: '',
    token: null,
    user: null,
    status: 'checking',
}



export const AuthContext = createContext({} as AuthContexProps);

export const AuthProvider = ({children }: any ) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

   const signIn = async({correo, password } :LoginData ) => {
    try {
        
        const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } )
        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
            }
        });

    } catch (error) {
        console.log(error.response.data.msg);
    }

   }

   const signUp = () => {

   }
   const logOut = () => {

   } 
   const removeError = () => {

   } 



    return (
        <AuthContext.Provider value={{
            ...state,
            signIn, 
            signUp, 
            logOut, 
            removeError,
        }} >
            { children }
        </AuthContext.Provider>

    );

} 
import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from "../api/cafeApi";
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContexProps = {
    errorMessege: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticaded' | 'not authenticaded';
    signUp: ( registerData: RegisterData ) => void;
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

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        
        if(!token) return dispatch({type: 'notAuthenticated' });

        const resp = await cafeApi.get('/auth')
        if(resp.status !== 200){
            return dispatch({type: 'notAuthenticated' });
        }

        await AsyncStorage.setItem('token', resp.data.token );

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
            }
        });

    }


   const signIn = async({correo, password } :LoginData ) => {
    try {
        
        const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } )
        dispatch({
            type: 'signUp',
            payload: {
                token: data.token,
                user: data.usuario,
            }
        });

        await AsyncStorage.setItem('token', data.token );

    } catch (error: any) {
        console.log(error.response.data.msg);
        dispatch({
            type: 'addError', 
            payload: error.response.data.msg || 'Informacion Incorrecta',
         } )
    }

   }

   const signUp = async( {nombre, correo, password } :RegisterData ) => {
    try {
        
        const { data } = await cafeApi.post<LoginResponse>('/usuarios', { correo, password, nombre } )
        dispatch({
            type: 'signUp',
            payload: {
                token: data.token,
                user: data.usuario,
            }
        });

        await AsyncStorage.setItem('token', data.token );

    } catch (error: any) {
        console.log(error.response.data.msg);
        dispatch({
            type: 'addError', 
            payload: error.response.data.errors[0].msg || 'Revise la información ',
         } )
    }
   }
   const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout' });
   } 
   const removeError = () => {
    dispatch({type: 'removeError'  });
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
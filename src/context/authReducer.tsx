import { Usuario } from '../interfaces/appInterfaces';


export interface AuthState {
    status: 'checking' | 'authenticaded' | 'not authenticaded';
    token: string | null;
    errorMessege: string;
    user: Usuario | null;

}

type AuthAction = 
    | { type: 'signUp', payload: { token: string, user: Usuario  } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }

export const authReducer = (state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        case 'addError':

           return {
               ...state,
               user: null,
               status: 'not authenticaded',
               token: null,
               errorMessege: action.payload,
           } 

        case 'removeError':
            return {
                ...state,
                errorMessege: ''
            }
        
        case 'signUp':
            return {
                ...state,
                errorMessege: '',
                status: 'authenticaded',
                token: action.payload.token,
                user: action.payload.user,
            }
        
            case 'logout': 
            case 'notAuthenticated':
                return {
                    ...state,
                    status: 'not authenticaded',
                    token: null,
                    user: null,
                }

    
        default:
            return state;
    }
}
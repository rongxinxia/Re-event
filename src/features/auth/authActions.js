import {LOGIN_USER,LOGOUT_USER} from './authConstants'
import {closeModal} from '../modal/modalActions'

export const login =(cred)=>{
    return dispatch =>{
        dispatch({type: LOGIN_USER, payload:{cred}});
        dispatch(closeModal())
    }
}


export const logout =()=>{
    return dispatch =>{
        dispatch({type: LOGOUT_USER});
        dispatch(closeModal())
    }
}
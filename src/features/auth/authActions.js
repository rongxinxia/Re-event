import {LOGIN_USER,LOGOUT_USER} from './authConstants'

export const login =(cred)=>{
    return{
        type:LOGIN_USER,
        payload:{
            cred
        }
    }
}


export const logout =()=>{
    return{
        type:LOGOUT_USER,
    }
}
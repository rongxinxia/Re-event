import {SubmissionError,reset} from 'redux-form'
import {closeModal} from '../modal/modalActions'
import {toastr} from 'react-redux-toastr'

export const login =(cred)=>{
    return async (dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(cred.email, cred.password)
            dispatch(closeModal())
        }catch(error){
            console.log(error);
            throw new SubmissionError({
                _error:error.message
            })
        }
    }
}

export const signup =(user) =>{
    return async (dispatch,getState, {getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log(firestore)
        try {
            let createdUser = await firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            
            await createdUser.updateProfile({
                displayName:user.displayName
            })

            //console.log(createdUser)
            
            let newUser  = {
                displayName: user.displayName,
                createdAt:firestore.FieldValue.serverTimestamp()
            }

            //console.log(newUser)

            await firestore.set(`users/${createdUser.uid}`,{...newUser})
            dispatch(closeModal())
        }catch(error){
            console.log(error)
            throw new SubmissionError({
                _error:error.message
            })
        }
    }
}


export const socialLogin = (selectedProvider) =>{
    return async (dispatch,getState, {getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        try{
            dispatch(closeModal())
            let user = await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            })
            if(user.additionalUserInfo.isNewUser){
                await firestore.set(`users/${user.user.uid}`,{
                    displayName:user.profile.displayNam,
                    photoURL: user.profile.avatarUrl,
                    createdAt:firestore.FieldValue.serverTimestamp()
                })
            }
        }catch(error){
            console.log(error)
        }

    }
}

export const updatePassword=(creds)=>{
    return async(dispatch,getState, {getFirebase}) =>{
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        try{
            await user.updatePassword(creds.newPassword1)
            await dispatch(reset("account"))
            toastr.success('Success', 'Your password has been updated')
        }catch(error){
            console.log(error)
            throw new SubmissionError({
                _error:error.message
            })
        }
    }
}

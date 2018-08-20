import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import cuid from 'cuid'
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions'

export const updateProfile = (user) =>{
    return async (dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase(); 
        const {isLoaded, isEmpty,...updatedUser} = user 

        if(updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth){
            updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
        }
        try{
            await firebase.updateProfile(updatedUser);
            toastr.success('Success', 'Update profile')
        }catch(error){
            console.log(error)
        }
    }
}

export const uploadUserImage = (file, fileName) =>{
    return async (dispatch, getState, {getFirebase, getFirestore})=>{
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_image`;
        const options ={
            name:imageName
        }
        try{
            dispatch(asyncActionStart())
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
            let userDoc = await firestore.get(`users/${user.uid}`)

            if(!userDoc.data().photoURL){
                await firebase.updateProfile({
                    photoURL:downloadURL
                })

                await user.updateProfile({
                    photoURL:downloadURL
                })
            }
            await firestore.add(
                {
                  collection: 'users',
                  doc: user.uid,
                  subcollections: [{ collection: 'photos' }]
                },
                {
                  name: imageName,
                  url: downloadURL
                }
              );
              dispatch(asyncActionFinish())
        }catch(error){
            console.log(error);
            dispatch(asyncActionError())
            throw new Error('Problem uploading photos');
        }
    }
}

export const deletePhoto=(photo)=>{
    return async(dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try{
            await firebase.deleteFile(`${user.uid}/user_image/${photo.name}`)
            await firestore.delete({
                collection:'users',
                doc:user.uid,
                subcollections: [{ collection: 'photos',doc: photo.id}]
            })
        }catch(error){
            console.log(error);
            throw new Error('Problem deleting photos');
        }
    }
}

export const setMainPhoto=(photo)=>{
    return async(dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase();
        try{
            return await firebase.updateProfile({
                photoURL: photo.url
            })
        }catch(error){
            //console.log(error);
            throw new Error('Problem setting main photo');
        }
    }
}
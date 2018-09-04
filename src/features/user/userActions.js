import moment from 'moment'
import {toastr} from 'react-redux-toastr'
import cuid from 'cuid'
import {asyncActionStart,asyncActionFinish,asyncActionError} from '../async/asyncActions'
import firebase from '../../app/config/config'
import { FETCH_EVENT } from '../events/evenConst';

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
    return async(dispatch,getState)=>{
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        const today = new Date(Date.now());
        let userDocRef = firestore.collection('users').doc(user.uid);
        let eventAttendeeRef = firestore.collection('event_attendee');
        try {
          let batch = firestore.batch();
      
          await batch.update(userDocRef, {
            photoURL: photo.url
          });
      
          let eventQuery = await eventAttendeeRef
            .where('userUid', '==', user.uid)
            .where('eventDate', '>', today);
      
          let eventQuerySnap = await eventQuery.get();
      
          for (let i = 0; i < eventQuerySnap.docs.length; i++) {
            let eventDocRef = await firestore
              .collection('events')
              .doc(eventQuerySnap.docs[i].data().eventId);
            
              let event = await eventDocRef.get();
      
              if (event.data().hostUid === user.uid) {
                batch.update(eventDocRef, {
                  hostPhotoURL: photo.url,
                  [`attendees.${user.uid}.photoURL`]: photo.url
                })
              } else {
                batch.update(eventDocRef, {
                  [`attendees.${user.uid}.photoURL`]: photo.url
                })
              }
          }
          console.log(batch);
          await batch.commit();
          dispatch(asyncActionFinish())
        } catch (error) {
          console.log(error);
          dispatch(asyncActionError())
          throw new Error('Problem setting main photo');
        }
      };
}

export const joinEvent=(event)=>{
    return  async(dispatch,getState,{getFirestore})=>{
        dispatch(asyncActionStart())
        const firestore = firebase.firestore();
        const user = firebase.auth().currentUser;
        const profile = getState().firebase.profile;
        const attendee = {
          going: true,
          joinDate: Date.now(),
          photoURL: profile.photoURL || '/assets/user.png',
          displayName: profile.displayName,
          host: false
        };
        try {
          let eventDocRef = firestore.collection('events').doc(event.id);
          let eventAttendeeDocRef = firestore.collection('event_attendee').doc(`${event.id}_${user.uid}`);
      
          await firestore.runTransaction(async (transaction) => {
            await transaction.get(eventDocRef);
            await transaction.update(eventDocRef, {
              [`attendees.${user.uid}`]: attendee
            })
            await transaction.set(eventAttendeeDocRef, {
              eventId: event.id,
              userUid: user.uid,
              eventDate: event.date,
              host: false
            })
          })
          toastr.success('Success', 'You have signed up to the event');
          dispatch(asyncActionFinish())
        } catch (error) {
          console.log(error);
          dispatch(asyncActionError());
          toastr.error('Oops', 'Problem signing up to event');
        }
    }
}

export const cancelJoinEvent=(event)=>{
    return  async(dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        try{
            //let eventDocRef = firestore.collection('events').doc(event.id);
            //let eventAttendeeDocRef = firestore.collection('event_attendee').doc(`${event.id}_${user.uid}`);
            await firestore.update(`events/${event.id}`,{
                [`attendees.${user.uid}`]:firestore.FieldValue.delete()
            })
            await firestore.delete(`event_attendee/${event.id}_${user.uid}`)
        }catch(error){
            console.log(error);
            toastr.error("Error",'Error in cancelling')
        }
    }
}

export const getUserEvents=(userId, activeTab)=>{
    return async(dispatch,getState)=>{
        dispatch(asyncActionStart());
        const firestore = firebase.firestore();
        const today = new Date(Date.now());
        let eventsRef = firestore.collection("event_attendee");
        let query;
        //console.log(userId)
        switch(activeTab){
            case 1: // past
                query = eventsRef.where('userUid','==',userId).where('eventDate','<=',today).orderBy('eventDate','desc');
                break;
            case 2: // future
                query = eventsRef.where('userUid','==',userId).where('eventDate','>=',today).orderBy('eventDate');
                break;
            case 3: // host
                query = eventsRef.where('userUid','==',userId).where('host','==',true).orderBy('eventDate','desc');
                break;
            default:
                query = eventsRef.where('userUid','==',userId).orderBy('eventDate','desc');
        }

        try{
            //console.log(query);
            let querySnap = await query.get();
            let events = [];
            for(let i=0; i<querySnap.docs.length; i++){
                let evt = await firestore.collection('events').doc(querySnap.docs[i].data().eventId).get();
                events.push({...evt.data(), id:evt.id})
            }
            //console.log(events)
            dispatch({type:FETCH_EVENT, payload:{events}})
            dispatch(asyncActionFinish());
        }catch(error){
            console.log(error);
            dispatch(asyncActionError());
        }

    }
}

export const addEventComment=(eventId, values, parentId)=>{
    return async(dispatch,getState,{getFirebase})=>{
        const firebase = getFirebase();
        const profile = getState().firebase.profile;
        const user = firebase.auth().currentUser;
        console.log(parentId)
        let newComment = {
            displayName:profile.displayName,
            photoURL: profile.photoURL || '/asset/user.png',
            uid: user.uid,
            text: values.comment,
            date: Date.now(),
            parentId:parentId
        }
        try{
            await firebase.push(`event_chat/${eventId}`,newComment);
        }catch(error){
            console.log(error);
            toastr.error('Fail','faile to comment')
        }
    }
}
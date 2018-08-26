import {DELETE_EVENT,FETCH_EVENT} from './evenConst';
import {asyncActionError,asyncActionFinish,asyncActionStart} from '../async/asyncActions'
import {fetchSampleData} from '../../app/data/mockApi'
import {toastr} from 'react-redux-toastr'
import {createNewEvent} from '../../app/common/util/helpers'
import moment from 'moment'

export const createEvent =(event)=>{
    return async (dispatch,getState,{getFirestore})=>{
        const firestore = getFirestore();
        const user = firestore.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        let newEvent = createNewEvent(user,photoURL,event);
        try{
            let createdEvent = await firestore.add(`events`,newEvent);
            await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`,{
                eventId: createdEvent.id,
                userUid: user.uid,
                eventDate: event.date,
                host:true 
            })
            toastr.success('Success','Event has been created');
        }catch(error){
            toastr.error('Fail','Something wrong')
        }
    }
}

export const updateEvent =(event)=>{

    return async (dispatch, getState, {getFirestore})=>{
        const firestore = getFirestore();
        if(event.date !== getState().firestore.ordered.events[0].data){
            event.date = moment(event.date).toDate();
        }
        try{
            await firestore.update(`events/${event.id}`,event);
            toastr.success('Success','Event has been updated');
        }catch(error){
            toastr.error('Fail','Something wrong')
        }
    }
}

export const deleteEvent =(eventId)=>{
    return async dispatch=>{
        try{
            dispatch({
                type:DELETE_EVENT,
                payload:{eventId}
        })
        toastr.success('Success','Event has been delete')
        }catch(error){
            toastr.error('Fail','Something wrong')
        }
    }
}

export const fetchEvent =(events)=>{
      return async dispatch=>{
        try{
            dispatch({
                type:FETCH_EVENT,
                payload:{events}
        })
        toastr.success('Success','Event has been fetched')
        }catch(error){
            toastr.error('Fail','Something wrong')
        }
    }

}

export const loadEvents =()=>{
    return async dispatch=>{
        try{
            dispatch(asyncActionStart());
            let events = await fetchSampleData();
            dispatch(fetchEvent(events.events));
            dispatch(asyncActionFinish())
        }catch(error){
            dispatch(asyncActionError());
        }
    }
}

export const cancelEvent =(cancelled,eventId)=>{
    return async(dispatch,getState,{getFirestore} )=>{
        const firestore = getFirestore();
        const message = cancelled ? 'Are you sure to delete':'Are you sure to reactivate?'
        try{
            toastr.confirm(message, {
                onOk: () =>
                  firestore.update(`events/${eventId}`, {
                    cancelled: cancelled
                  })
              });
        }catch(error){

        }
    }
}
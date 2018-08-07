import {CREATE_EVENT,UPDATE_EVENT,DELETE_EVENT,FETCH_EVENT} from './evenConst';
import {asyncActionError,asyncActionFinish,asyncActionStart} from '../async/asyncActions'
import {fetchSampleData} from '../../app/data/mockApi'
import {toastr} from 'react-redux-toastr'

export const createEvent =(event)=>{
    return async dispatch=>{
        try{
            dispatch({
                type:CREATE_EVENT,
                payload:{event}
        })
        toastr.success('Success','Event has been created')
        }catch(error){
            toastr.error('Fail','Something wrong')
        }
    }
}

export const updateEvent =(event)=>{

    return async dispatch=>{
        try{
            dispatch({
                type:UPDATE_EVENT,
                payload:{event}
        })
        toastr.success('Success','Event has been updated')
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
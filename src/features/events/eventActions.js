import {CREATE_EVENT,UPDATE_EVENT,DELETE_EVENT,FETCH_EVENT} from './evenConst';
import {asyncActionError,asyncActionFinish,asyncActionStart} from '../async/asyncActions'
import {fetchSampleData} from '../../app/data/mockApi'


export const createEvent =(event)=>{
    return {
        type:CREATE_EVENT,
        payload:{event}
    }
}

export const updateEvent =(event)=>{
    return {
        type:UPDATE_EVENT,
        payload:{event}
    }
}

export const deleteEvent =(eventId)=>{
    return {
        type:DELETE_EVENT,
        payload:{eventId}
    }
}

export const fetchEvent =(events)=>{
    return {
        type:FETCH_EVENT,
        payload:{events}
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
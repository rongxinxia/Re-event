import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT,FETCH_EVENT} from './evenConst';
import {createReducer} from '../../app/common/util/reducerUtil'


 const initialState = [];

export const createevent = (state,payload) =>{
        return[...state, Object.assign({},payload.event)]
};


export const updateevent = (state,payload) =>{
        return [
            ...state.filter(event => event.id !== payload.event.id),
            Object.assign({},payload.event)
        ]
}

export const deleteevent = (state,payload) =>{
    return [
        ...state.filter(event => event.id !== payload.eventId)
    ]
}

export const fetchevent = (state,payload) =>{
  return payload.events
}

export default createReducer(initialState,{[
        CREATE_EVENT]:createevent, [
        UPDATE_EVENT]:updateevent, 
        [DELETE_EVENT]:deleteevent,
        [FETCH_EVENT]:fetchevent
    })



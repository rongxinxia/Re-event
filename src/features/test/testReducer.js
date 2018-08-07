import {INCREMENT_COUNTER,DECREMENT_COUNTER,COUNTER_START, COUNTER_FINISH} from './testConstants'
import {createReducer} from '../../app/common/util/reducerUtil'


const initialState={
    data:42,
    loading:false
};

export const incrementCounter=(state, payload)=>{
    return {...state, data: state.data+1};
}

export const decrementCounter=(state, payload)=>{
    return {...state, data: state.data-1};
}

export const startCounter=(state, payload)=>{
    return {...state, loading:true};
}

export const finishCounter=(state, payload)=>{
    return {...state, loading:false};
}


export default createReducer(initialState,{
    [INCREMENT_COUNTER]:incrementCounter,
    [DECREMENT_COUNTER]:decrementCounter,
    [COUNTER_FINISH]:finishCounter,
    [COUNTER_START]:startCounter
});
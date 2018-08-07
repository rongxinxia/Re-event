import {INCREMENT_COUNTER,DECREMENT_COUNTER,COUNTER_FINISH,COUNTER_START} from './testConstants';

export const increment_Counter =()=>{
    return {
        type:INCREMENT_COUNTER
    }
}

export const decrement_Counter =()=>{
    return {
        type:DECREMENT_COUNTER
    }
}

export const startCounter =()=>{
    return {
        type:COUNTER_START
    }
}

export const finishCounter =()=>{
    return {
        type:COUNTER_FINISH
    }
}

const delay = (ms) =>{
    return new Promise(resolve => setTimeout(resolve,ms))
}

export const incrementAsync = ()=>{
    return async dispatch=>{
        dispatch(startCounter());
        await delay(1000);
        dispatch({type:INCREMENT_COUNTER});
        dispatch(finishCounter());
    }
}

export const decrementAsync = ()=>{
    return async dispatch=>{
        dispatch(startCounter());
        await delay(1000);
        dispatch({type:DECREMENT_COUNTER});
        dispatch(finishCounter());
    }
}

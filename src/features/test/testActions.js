import {INCREMENT_COUNTER,DECREMENT_COUNTER} from './testConstants';

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
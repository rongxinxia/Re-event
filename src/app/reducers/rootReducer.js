import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import testReducer from '../../features/test/testReducer';
import eventReducer from '../../features/events/eventReducer'
import modalReducer from '../../features/modal/modalReducer'
import authReducer from '../../features/auth/authReducer'
import asyncReducer from '../../features/async/asyncReducer'

const rootReducer = combineReducers({
    test:testReducer,
    events:eventReducer,
    form:FormReducer,
    modals:modalReducer,
    auth: authReducer,
    async: asyncReducer
});

export default rootReducer;
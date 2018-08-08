import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import testReducer from '../../features/test/testReducer';
import eventReducer from '../../features/events/eventReducer'
import modalReducer from '../../features/modal/modalReducer'
import authReducer from '../../features/auth/authReducer'
import asyncReducer from '../../features/async/asyncReducer'
import {reducer as toasterReducer}from 'react-redux-toastr'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'

const rootReducer = combineReducers({
    test:testReducer,
    events:eventReducer,
    form:FormReducer,
    modals:modalReducer,
    auth: authReducer,
    async: asyncReducer,
    toastr:toasterReducer,
    firebase:firebaseReducer,
    firestore:firestoreReducer
});

export default rootReducer;
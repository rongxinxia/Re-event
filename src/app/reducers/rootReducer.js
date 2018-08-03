import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import testReducer from '../../features/test/testReducer';
import eventReducer from '../../features/events/eventReducer'

const rootReducer = combineReducers({
    test:testReducer,
    events:eventReducer,
    form:FormReducer
});

export default rootReducer;
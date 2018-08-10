import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {reactReduxFirebase, getFirebase}from 'react-redux-firebase'
import {reduxFirestore,getFirestore} from 'redux-firestore'
import firebase from '../config/config'

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile:true,
    updateProfileOnLogin: false
}


export const configureStore =(preloadedState)=>{
    const middleware = [thunk.withExtraArgument({getFirebase,getFirestore})];
    const middlewareEnhancer = applyMiddleware(...middleware);

    const stroeEnhancer = [middlewareEnhancer];

    const composeEnhancer=composeWithDevTools(...stroeEnhancer,
        reactReduxFirebase(firebase,rrfConfig),
        reduxFirestore(firebase));

    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancer
    );

    if(process.env.NODE_ENV !== 'production'){
        if(module.hot){
            module.hot.accept('../reducers/rootReducer',()=>{
                const newRootReducer=require('../reducers/rootReducer').default;
                store.replaceReducer(newRootReducer);
            })
        }
    }

    return store;
}
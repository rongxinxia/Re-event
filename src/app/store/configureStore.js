import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
export const configureStore =(preloadedState)=>{
    const middleware = [thunk];
    const middlewareEnhancer = applyMiddleware(...middleware);

    const stroeEnhancer = [middlewareEnhancer];

    const composeEnhancer=composeWithDevTools(...stroeEnhancer);

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
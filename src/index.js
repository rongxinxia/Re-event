import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {Provider} from 'react-redux'
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from './app/store/configureStore'
import Scroll  from './app/common/util/scroll';
import {loadEvents} from './features/events/eventActions'

const root = document.getElementById('root');

const store = configureStore();
store.dispatch(loadEvents())

let render = () =>{
    ReactDOM.render(
        <Provider store={store}>
        <BrowserRouter>
        <Scroll>
        <   App/>
        </Scroll>
        </BrowserRouter>
        </Provider>, 
        root
    );
};

if(module.hot){
    module.hot.accept('./app/layout/App',()=>{
        setTimeout(render);
    })
}

render();

//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

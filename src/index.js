import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {Provider} from 'react-redux'
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {configureStore} from './app/store/configureStore'
const root = document.getElementById('root');

const store = configureStore();

let render = () =>{
    ReactDOM.render(
        <Provider store={store}>
        <BrowserRouter>
            <App />
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

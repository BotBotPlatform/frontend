import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { loadCookie } from './utils/cookies';
import { loginFromJWT, registerAccessToken } from './actions/users';
import ReduxThunk from 'redux-thunk';
import apiService from './actions/index.js';


const store = configureStore();

const token = loadCookie('token');

function hasAccess() {
	var access = false;
    apiService('user/token', { method: 'GET' })
    	.then((res) => res.json())
        	.then((json) => { if (json['facebook_token']) { store.dispatch(registerAccessToken(token)); }});
};
    
if (token) store.dispatch(loginFromJWT(token));
hasAccess();


ReactDOM.render((
	<Provider store={store}>
	  <BrowserRouter>
	    <App />
	  </BrowserRouter>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();

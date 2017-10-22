import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    compose(
    	applyMiddleware(thunk),
    	window.__REDUX_DEVTOOLS_EXTENSION__ ? window.devToolsExtension() : f => f)
    
);

export default configureStore;

import {createStore , applyMiddleware , compose} from "redux"
import thunk from 'redux-thunk'
import rootReducer from './rootReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(rootReducer, applyMiddleware(thunk),)  
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers( applyMiddleware(thunk)
));
export default store
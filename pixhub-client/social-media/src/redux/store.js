import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './auth/reducer';
import dataReducer from './data/reducer';

const combinedReducer = combineReducers({
    auth: authReducer,
    data: dataReducer
})

const store = createStore(combinedReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()))

export default store;
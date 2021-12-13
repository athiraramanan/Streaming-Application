import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import streamReducer from './streamReducer';
// import { reducer  } from 'redux-form'; 2 and 3 are both same
// if you just use 3 then form: reducer

import authReducer from './authReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	streams: streamReducer
})



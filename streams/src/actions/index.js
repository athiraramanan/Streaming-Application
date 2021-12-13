import streams from '../apis/streams';
import history from '../history';
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM
} from './types';

export const signIn = (userId) =>{
	return{
		type: SIGN_IN,
		payload: userId
	};
};


export const signOut = () =>{
	return{
		type: SIGN_OUT
	};
};

// getState having the auth related stuffs
export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;
  const responce =  await streams.post('/streams', {...formValues, userId});
  dispatch ({type: CREATE_STREAM, payload: responce.data});
  //Here we can forfully navigate after successfully created one stream
  history.push('/')
};

export const fetchStreams = () => async dispatch => {
	const responce = await streams.get('/streams');
	dispatch ({type: FETCH_STREAMS, payload: responce.data})
};

export const fetchStream = (id) => async dispatch => {
	const responce = await streams.get(`/streams/${id}`);
	dispatch ({type: FETCH_STREAM, payload: responce.data})
};

export const editStream = (id, formValues) => async dispatch => {
	// if we call put request the non given values like user id
	// updated as null so inorder to avoid that we make a patch request
	// const responce = await streams.put(`/streams/${id}`, formValues)
	const responce = await streams.patch(`/streams/${id}`, formValues)
	dispatch ({type: EDIT_STREAM, payload: responce.data})
	history.push('/');
};

export const deleteStream = (id) => async dispatch =>{
	await streams.delete(`/streams/${id}`)
	dispatch ({type: DELETE_STREAM, payload: id})
	history.push('/');
} ;
import axios from 'axios';

import {
	GET_DIET,
	GET_DIETS,
	GET_ERRORS,
	CLEAR_ERRORS,
	DIET_LOADING,
	GET_DIET_BY_ID
} from './types';

// Get diets
export const getDiets = () => dispatch => {
	dispatch(dietLoading());
	axios.get('/api/diets')
		.then(res => dispatch({type: GET_DIETS, payload: res.data }))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Get diet by ID
export const getDietByID = (id) => dispatch => {
	dispatch(dietLoading());
	axios.get(`/api/diets/${id}`)
		.then(res => dispatch({type: GET_DIET_BY_ID, payload: res.data }))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Add diet
export const addDiet = (dietData) => dispatch => {
	axios.post('/api/diets', dietData)
		.then(() => {
			dispatch(clearErrors());
			dispatch(getDiets());
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Delete diet
export const deleteDiet = (id) => dispatch => {
	axios.delete(`/api/diets/${id}`)
		.then(() => {
			dispatch(getDiets());
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Like diet
export const likeDiet = (id) => dispatch => {
	axios.post(`/api/diets/likes/${id}`)
		.then(() => {
			dispatch(getDietByID(id));
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Add comment to diet
export const addComment = (id, data) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/diets/comments/${id}`, data)
		.then(() => {
			dispatch(getDietByID(id));
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Add comment to diet
export const deleteComment = (dietId, commentId) => dispatch => {
	axios.delete(`/api/diets/comments/${dietId}/${commentId}`)
		.then(() => {
			dispatch(getDietByID(dietId));
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};



// Diet loading
export const dietLoading = () => {
	return { type: DIET_LOADING };
};

// Clear errors
export const clearErrors = () => {
	return { type: CLEAR_ERRORS };
};

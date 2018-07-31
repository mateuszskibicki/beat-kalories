import axios from 'axios';

import {
	GET_RECIPE_BY_ID,
	GET_RECIPES,
	GET_ERRORS,
	RECIPE_LOADING,
	ADD_RECIPE,
	LIKE_RECIPE,
	CLEAR_ERRORS
} from '../actions/types';

// Get recipes
export const getRecipes = () => dispatch => {
	dispatch(clearErrors());
	dispatch(recipeLoading());
	axios.get('/api/recipes')
		.then(res => dispatch({type: GET_RECIPES, payload: res.data }))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Get recipes
export const getRecipeByID = (id) => dispatch => {
	dispatch(clearErrors());
	dispatch(recipeLoading());
	axios.get(`/api/recipes/${id}`)
		.then(res => dispatch({type: GET_RECIPE_BY_ID, payload: res.data }))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Add recipes
export const addRecipe = (recipeData) => dispatch => {
	axios.post('/api/recipes', recipeData)
		.then(res => {
			dispatch(clearErrors());
			dispatch(getRecipes());
			dispatch(updateUserWithNewRecipe({recipeID: res.data._id}));
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Add recipe to the user's diet array
export const updateUserWithNewRecipe = (recipeID) => dispatch => {
	axios.post('/api/recipes/addRecipeToTheUser', recipeID)
		.then(() => {
			console.log('Recipe added to the user');
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Update recipe on main /recipe page
export const updateRecipe = (id , recipeData) => dispatch => {
	axios.post(`/api/recipes/update/${id}`, recipeData)
		.then(() => {
			dispatch(getRecipes());
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};

// Delete recipe on recipe page
export const deleteRecipe = (id) => dispatch => {
	axios.delete(`/api/recipes/${id}`)
		.then(() => {
			dispatch(getRecipes());
		})
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
};


// Recipe loading
export const recipeLoading = () => {
	return { type: RECIPE_LOADING };
};

// Clear errors
export const clearErrors = () => {
	return { type: CLEAR_ERRORS };
};

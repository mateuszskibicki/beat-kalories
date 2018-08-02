import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
// public routes
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// ----- PRIVATE ROUTES
import LeftNavbar from './components/navbar/LeftNavbar';
import TopNavbar from './components/navbar/TopNavbar';

import About from './components/about/About';
import Profile from './components/profile/Profile';
import Users from './components/users/Users';
import Posts from './components/posts/Posts';
import Trainings from './components/trainings/Trainings';
import Diets from './components/diets/Diets';
import DietSinglePage from './components/diets/DietSinglePage';
import Recipes from './components/recipes/Recipes';
import RecipeSinglePage from './components/recipes/RecipeSinglePage';

import Calculators from './components/calculators/Calculators';


//Check for token
if (localStorage.jwtToken) {
// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">

						{
							// Public routes
						}

						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />

						{
							// Private routes
						}
						<div className="container-fluid p-0">
							<div className="row">
								<div className="col-12">
									<Switch>
										<PrivateRoute path="/" component={TopNavbar} />
									</Switch>
								</div>
								<div className="col-12 col-sm-3 col-xl-2">
									<Switch>
										<PrivateRoute path="/" component={LeftNavbar} />
									</Switch>
								</div>
								<div className="col-12 col-sm-9 col-xl-10">
									{
									// ABOUT PAGE
									}
									<Switch>
										<PrivateRoute exact path="/" component={About} />
									</Switch>

									{
										// USERS
									}
									<Switch>
										<PrivateRoute exact path="/users" component={Users} />
									</Switch>

									{
										// PROFILE PAGE
									}
									<Switch>
										<PrivateRoute exact path="/profile/:nickname" component={Profile} />
									</Switch>

									{
										// POSTS
									}
									<Switch>
										<PrivateRoute exact path="/posts" component={Posts} />
									</Switch>

									{
										// DIETS
									}
									<Switch>
										<PrivateRoute exact path="/diets" component={Diets} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/diets/:id" component={DietSinglePage} />
									</Switch>

									{
										// RECIPES
									}
									<Switch>
										<PrivateRoute exact path="/recipes" component={Recipes} />
									</Switch>
									<Switch>
										<PrivateRoute exact path="/recipes/:id" component={RecipeSinglePage} />
									</Switch>

									{
										// TRAININGS
									}
									<Switch>
										<PrivateRoute exact path="/trainings" component={Trainings} />
									</Switch>

									{
										// CALCULATORS
									}
									<Switch>
										<PrivateRoute exact path="/calculators" component={Calculators} />
									</Switch>

								</div>
							</div>

						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;

const component = () => (
	<div>
		<Navbar />
		<Route exact path="/" component={Landing} />
		<div className="container">
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/profiles" component={Profiles} />
			<Route exact path="/profile/:handle" component={Profile} />
			<Switch>
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/create-profile" component={CreateProfile} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/edit-profile" component={EditProfile} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/add-experience" component={AddExperience} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/add-education" component={AddEducation} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/post/:id" component={Post} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/feed" component={Posts} />
			</Switch>
			<Route exact path="/not-found" component={NotFound} />
		</div>
		<Footer />
	</div>
);

require('../sass/main.scss');

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import { render } from 'react-dom';

import App from './components/App';
import Login from './components/Login';
import VideoListings from './components/VideoListings';
import VideoDetails from './components/VideoDetails';

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Login}></IndexRoute>
				<Route path='/videos' component={VideoListings} />
				<Route path='/video/:videoId' component={VideoDetails} />
			</Route>
		</Router>
	</Provider>
)

render(router, document.getElementById('app'));

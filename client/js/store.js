import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';

// import root reducer
import rootReducer from './reducers/index';

// create an object for the default data
const initialState = {
	user: {
		username: '',
		sessionId: ''
	},
	videos: []
};

const store = createStore(rootReducer, initialState, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default();
		store.replaceReducer(nextRootReducer);
	});
}

export default store;

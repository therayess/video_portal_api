// a reducer takes in 2 things:

// 1. the action (info about what happened)
// 2. a copy of the current state
// here's an action, store --> process (update) --> updated store

function user(state = {}, action) {
	switch (action.type) {
		case 'LOGIN':
		    return {username: action.username, sessionId: action.sessionId};
		case 'LOGIN_ERROR':
			return {login_error: action.error}
		case 'LOGOUT':
			return {username: '', sessionId: ''};
		default:
			return state;
	}
}

export default user;

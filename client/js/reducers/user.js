function user(state = {}, action) {
	switch (action.type) {
		case 'LOGIN':
			// update the user state
		    return {username: action.username, sessionId: action.sessionId};
		case 'LOGIN_ERROR':
			// used to display errors locally in login page
			return {login_error: action.error}
		case 'LOGOUT':
			// empty the user state
			return {username: '', sessionId: ''};
		default:
			return state;
	}
}

export default user;

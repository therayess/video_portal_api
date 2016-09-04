// a reducer takes in 2 things:

// 1. the action (info about what happened)
// 2. a copy of the current state
// here's an action, store --> process (update) --> updated store

function videos(state = {}, action) {
	const index = action.index;
	
	switch (action.type) {
		case 'GET_VIDEOS':
			return [...state, ...action.videos];
		case 'LOGOUT':
			return [];
		case 'RATE':
			return [
				...state.slice(0, index),
				action.video,
				...state.slice(index + 1)
			]
		default:
			return state;
	}
}

export default videos;

function videos(state = {}, action) {
	switch (action.type) {
		case 'GET_VIDEOS':
			// append incoming vids to existing ones
			return [...state, ...action.videos];
		case 'LOGOUT':
			// empty the videos state
			return [];
		case 'RATE':
			// update the rated video only, keep other videos intact
			return [
				...state.slice(0, action.index),
				action.video,
				...state.slice(action.index + 1)
			]
		default:
			return state;
	}
}

export default videos;

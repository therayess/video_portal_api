export function loginAction(username, password) {
	return function(dispatch, getState) {
	    let url = "/user/auth",
	    	postData = JSON.stringify({username: username, password: password}),
	    	request = new Request(url, {
				method: 'POST',
				body: postData,
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			});

		return fetch(request).then(function(result) {
			if (result.status === 200) {
				return result.json();
			}
		}).then(function(jsonResult) {
			if (jsonResult.error) {
				dispatch(loginError(jsonResult.error));
			}
			else {
				dispatch(login(jsonResult.username, jsonResult.sessionId));
			}
		}).catch(function(err) {
			// handle login error
			console.log(err);
		});
	}
}

export function login(username, sessionId) {
	return {
		type: 'LOGIN',
		username,
		sessionId
	}
}

export function loginError(error) {
	return {
		type: 'LOGIN_ERROR',
		error
	}
}

export function logout() {
	return {
		type: 'LOGOUT'
	}
}

export function getVideosAction(sessionId, limit = null, skip = null) {
	return function(dispatch, getState) {
	    let url = "/videos?sessionId=" + sessionId;
	    if (limit) { url += "&limit=" + limit };
	    if (skip) { url += "&skip=" + skip };

	    let	request = new Request(url, {
				method: 'GET',
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			});

		return fetch(request).then(function(result) {
			if (result.status === 200) {
				return result.json();
			}
		}).then(function(jsonResult) {
			if (jsonResult.error) {
				console.log(jsonResult.error);
			}
			else {
				dispatch(getVideos(jsonResult.data));
			}
		}).catch(function(err) {
			console.log(err);
		});
	}
}

export function getVideos(videos) {
	return {
		type: 'GET_VIDEOS',
		videos
	}
}

export function rateVideoAction(videoId, rating, index) {
	return function(dispatch, getState) {
		let sessionId = getState().user.sessionId;

		if (sessionId === '') return;

	    let url = "/video/ratings?sessionId=" + sessionId,
	    	postData = JSON.stringify({videoId: videoId, rating: rating}),
	    	request = new Request(url, {
				method: 'POST',
				body: postData,
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			});

		return fetch(request).then(function(result) {
			if (result.status === 200) {
				return result.json();
			}
		}).then(function(jsonResult) {
			if (jsonResult.error) {
				console.log(jsonResult.error);
			}
			else {
				dispatch(rate(jsonResult.data, index));
			}
		}).catch(function(err) {
			console.log(err);
		});
	}
}

export function rate(video, index) {
	return {
		type: 'RATE',
		video,
		index
	}
}

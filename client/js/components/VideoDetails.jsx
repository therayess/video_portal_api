import React from 'react';
import Rating from 'react-rating';
import { Link } from 'react-router';

// I already have the videos in my store, so instead of making an api call
// to get single video, i'm going to match the video id i have in my url with 
// my state videos to retrieve the requested single video. then i use componentWillReceiveProps
// to listen to changes in the props such as navigating between details pages and i reset my state
// with the updated props which will re-render the page.
class VideoDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			video: [],
			otherVids: [],
			index: 0,
			rated: false
		}

		this.resetState = this.resetState.bind(this);
		this.handleVideosPlay = this.handleVideosPlay.bind(this);
		this.renderRating = this.renderRating.bind(this);
		this.rateVideo = this.rateVideo.bind(this);
	}
	resetState(props) {
		let index = props.videos.findIndex(video => video._id == props.params.videoId),
			otherVids = [];

		// Getting the previous and next videos to display in the sidebar
		if (index > 0) {otherVids = otherVids.concat(props.videos[index - 1])};
		if (index < props.videos.length) {otherVids = otherVids.concat(props.videos[index + 1])};

		this.setState({
			video: props.videos[index],
			otherVids: otherVids,
			index: index,
			rated: false
		});
	}
	handleVideosPlay(e) {
		// To make sure only one video is playing at a time
		let videos = document.getElementsByTagName('video'),
			currentVideo = e.target;

		for (let i = 0; i < videos.length; i++) {
			if (videos[i] != currentVideo) {
				videos[i].pause();
			}
		}
	}
	renderRating(ratingArr, readonly = false) {	
		// getting the average rating from the ratings array then i'm returning 3 shapes
		// of rating component for different states of the rating:
		let ratingAvg = Math.ceil(ratingArr.reduce(function(sum, a) { return sum + a },0)/(ratingArr.length||1));

		if (readonly) {
			// this is for readonly rating, used in the sidebar videos
			return (
				<Rating initialRate={ratingAvg} 
					empty="glyphicon glyphicon-star-empty star-grey fs-lg" 
					full="glyphicon glyphicon-star star-yellow fs-lg" 
					readonly />
			)
		}
		else {
			if (this.state.rated) {
				// this is the state after rating is done, used for the main video
				return (
					<div className="ratings-wrapper">
						<span className="rating-msg">Overall rating </span>
						<Rating initialRate={ratingAvg} 
						empty="glyphicon glyphicon-star-empty star-grey fs-lg" 
						full="glyphicon glyphicon-star star-yellow fs-lg"
						readonly />
						<span className="rating-msg"> Got it!</span>
					</div>
				)
			}
			else {
				// this one enables users to rate, used for the main video
				return (
					<div className="ratings-wrapper">
						<span className="rating-msg">Overall rating </span>
						<span className="rate-msg">Rate this video</span>
						<Rating placeholderRate={ratingAvg} 
						empty="glyphicon glyphicon-star-empty star-grey fs-lg" 
						placeholder="glyphicon glyphicon-star star-yellow fs-lg" 
						full="glyphicon glyphicon-star star-red fs-lg" 
						onClick={this.rateVideo.bind(null, this.props)} />
					</div>
				)
			}
		}
	}
	rateVideo(props, rating) {
		// dispatch rating action
		props.rateVideoAction(this.state.video._id, rating, this.state.index);
	}
	componentWillMount() {
		// update the state and re-render the page
		this.resetState(this.props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.user.sessionId && nextProps.user.sessionId != '') {
			// listen to rating change and update state with the video including the new rating
			if ((nextProps.videos[this.state.index]._id == this.state.video._id) &&
				(nextProps.videos[this.state.index].ratings.length != this.state.video.ratings.length)) {
				this.setState({rated: true});
			}

			// handle navigation between details pages
			if (nextProps.params.videoId != this.props.params.videoId) {
				// manage video state and source refresh, needs to be done manually 
				let videos = document.getElementsByTagName('video');
				for (let i = 0; i < videos.length; i++) {
					let video = videos[i],
						source = document.createElement('source');

					video.pause();
					source.setAttribute('src', '/' + video.url);
					video.appendChild(source);
					video.load();
				}

				// reset rated state
				this.resetState(nextProps);
			}
		}
	}
	render() {
		let video = this.state.video;
		return (
			<section className="video-details-wrapper">
				<div className="details-tron">
					<div className="container">
						<div className="video-wrapper">
							<video controls onPlay={this.handleVideosPlay}>
								<source src={`/${video.url}`} type="video/mp4"></source>
								Your browser does not support the video tag.
							</video>
						</div>
					</div>
				</div>
				<div className="container section-wrapper">
					<div className="row">
						<div className="col-xs-12 col-md-8">
							<div className="info-head row">
								<div className="col-xs-12 col-md-6">
									<div className="video-title">{video.name}</div>
								</div>
								<div className="col-xs-12 col-md-6 text-right">
									{this.renderRating(video.ratings)}
								</div>
							</div>
							<div className="video-desc">
								<p><strong>About this video</strong></p>
								<p>{video.description}</p>
								<p>
									<Link to='/videos'>{`<<`} Back to all videos</Link>
								</p>
							</div>
						</div>
						<div className="col-xs-12 col-md-4">
							<p className="text-center"><strong>Check out these videos too:</strong></p>
							{this.state.otherVids.map((video, index) => (
								<div className="video-figure-wrapper" key={index}>
									<div className="video-figure">
										<div className="video-title">
											<Link className="video-link" to={`/video/${video._id}`}>{video.name}</Link>
										</div>
										<div className="video-wrapper">
											<video controls onPlay={this.handleVideosPlay}>
												<source src={`/${video.url}`} type="video/mp4"></source>
												Your browser does not support the video tag.
											</video>
										</div>
										<div className="text-center">{this.renderRating(video.ratings, true)}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		)
	}
}

module.exports = VideoDetails;

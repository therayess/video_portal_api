import React from 'react';
import Rating from 'react-rating';
import { Link } from 'react-router';

class VideoFigure extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rated: false
		}

		this.handleVideosPlay = this.handleVideosPlay.bind(this);
		this.renderRating = this.renderRating.bind(this);
		this.rateVideo = this.rateVideo.bind(this);
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
	renderRating(ratingArr) {	
		// getting the average rating from the ratings array then i'm returning 3 shapes
		// of rating component for different states of the rating:
		let ratingAvg = Math.ceil(ratingArr.reduce(function(sum, a) { return sum + a },0)/(ratingArr.length||1));

		if (this.props.withLink) {
			// this is for readonly rating
			return (
				<Rating initialRate={ratingAvg} 
					empty="glyphicon glyphicon-star-empty star-grey fs-lg" 
					full="glyphicon glyphicon-star star-yellow fs-lg" 
					readonly />
			)
		}
		else {
			if (this.state.rated) {
				// this is the state after rating is done
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
				// this one enables users to rate
				return (
					<div className="ratings-wrapper">
						<span className="rating-msg">Overall rating </span>
						<span className="rate-msg">Rate this video</span>
						<Rating placeholderRate={ratingAvg} 
						empty="glyphicon glyphicon-star-empty star-grey fs-lg" 
						placeholder="glyphicon glyphicon-star star-red fs-lg" 
						full="glyphicon glyphicon-star star-yellow fs-lg" 
						onClick={this.rateVideo.bind(null, this.props)} />
					</div>
				)
			}
		}
	}
	rateVideo(props, rating) {
		// dispatch rating action
		props.rateVideoAction(props.video._id, rating, props.vidIndex);
	}
	componentWillReceiveProps(nextProps) {
		let index = nextProps.videos.findIndex(video => video._id == nextProps.params.videoId);

		if (nextProps.user.sessionId && nextProps.user.sessionId != '') {
			// listen to rating change and update state with the video including the new rating
			if (nextProps.videos[this.props.vidIndex].ratings.length != this.props.video.ratings.length) {
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
				this.setState({rated: false});
			}
		}
	}
	render() {
		let video = this.props.video,
			videoTitleComponent;

		// i'm using withLink to define the sidebar videos that users can navigate to,
		// otherwise i display a normal header for the main video.
		if (this.props.withLink) {
			videoTitleComponent = <Link to={`/video/${video._id}`}>{video.name}</Link>
		}
		else {
			videoTitleComponent = <h2>{video.name}</h2>
		}
		return (	
			<figure className="video-figure">
				<div className="video-title">
					{videoTitleComponent}
				</div>
				<div className="video-wrapper">
					<video controls onPlay={this.handleVideosPlay}>
						<source src={`/${video.url}`} type="video/mp4"></source>
						Your browser does not support the video tag.
					</video>
				</div>

				<figcaption>
					{this.renderRating(video.ratings)}
					<p className="video-desc">{video.description}</p>
				</figcaption>
			</figure>		
		)
	}
}

module.exports = VideoFigure;

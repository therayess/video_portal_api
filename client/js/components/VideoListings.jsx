import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Rating from 'react-rating';
import { Link } from 'react-router';

class VideoListings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: props.videos || [],
			limit: 5	// change this to change number of fetched videos for loading more videos
		}

		this.handleVideosPlay = this.handleVideosPlay.bind(this);
		this.loadMoreVids = this.loadMoreVids.bind(this);
		this.renderRating = this.renderRating.bind(this);
	}
	loadMoreVids() {
		this.props.getVideosAction(this.props.user.sessionId, this.state.limit, this.state.videos.length);
	}
	handleVideosPlay(e) {
		let videos = document.getElementsByTagName('video'),
			currentVideo = e.target;

		for (let i = 0; i < videos.length; i++) {
			if (videos[i] != currentVideo) {
				videos[i].pause();
			}
		}
	}
	renderRating(ratingArr) {
		let ratingAvg = Math.ceil(ratingArr.reduce(function(sum, a) { return sum + a },0)/(ratingArr.length||1));
		
		return (
			<Rating initialRate={ratingAvg} 
				empty="glyphicon glyphicon-star-empty star-grey fs-lg" 
				full="glyphicon glyphicon-star star-yellow fs-lg" 
				readonly />
		)
	}
	componentWillMount() {
		// dispatch getVideos action on page load
		if (this.props.videos.length == 0)
			this.props.getVideosAction(this.props.user.sessionId);
	}
	componentWillReceiveProps(nextProps) {
		// handle loading more vids
		if ((nextProps.user.sessionId && nextProps.user.sessionId != '') && 
		   (nextProps.videos.length != this.props.videos.length)) {
			this.setState({videos: nextProps.videos});
		}
	}
	render() {
		return (
			<div>
				<InfiniteScroll
					next={this.loadMoreVids.bind(this)}
					hasMore={true}  
					loader={<h3 className="text-center">Loading...</h3>}>

					<div className="row">
						{this.props.videos.map((video, index) => (
							<div className="video-grid-wrapper col-xs-12 col-md-4" key={index}>
								<figure className="video-figure">
									<div className="video-title">
										<Link to={`/video/${video._id}`}>{video.name}</Link>
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
							</div>
						))}
					</div>
				</InfiniteScroll>
			</div>
		)
	}
}

module.exports = VideoListings;

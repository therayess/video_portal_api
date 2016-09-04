import React from 'react';
import VideoFigure from './VideoFigure';
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
			index: 0
		}

		this.resetState = this.resetState.bind(this);
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
			index: index
		});
	}
	componentWillMount() {
		this.resetState(this.props);
	}
	componentWillReceiveProps(nextProps) {
		// listen to detail page navigation changes
		if ((nextProps.user.sessionId && nextProps.user.sessionId != '') && 
			(nextProps.params.videoId != this.props.params.videoId)) {
			this.resetState(nextProps);
		}
	}
	render() {
		return (
			<div className="row">
				<div className="text-center">
					<Link to='/videos'>{`<<`} Back to videos</Link>
				</div>
				<div className="col-xs-12 col-md-8 video-figure-wrapper">
					<VideoFigure video={this.state.video} vidIndex={this.state.index} {...this.props} />
				</div>
				<div className="col-xs-12 col-md-4">
					{this.state.otherVids.map((video, index) => (
						<div className="video-figure-wrapper" key={index}>
							<VideoFigure video={video} 
										key={index} 
										vidIndex={this.state.index} 
										{...this.props} 
										withLink />
						</div>
					))}
				</div>
			</div>
		)
	}
}

module.exports = VideoDetails;

import React from 'react';
import md5 from 'md5';
import { history } from '../store';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			login_error: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleErrors = this.handleErrors.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		let username = this.refs.username.value,
			password = md5(this.refs.password.value);

		if (username && password) {
			// dispatch login action
			this.props.loginAction(username, password);
		}
		else {
			// show empty field errors
			this.setState({login_error: "Enter username and password"});
		}
	}
	handleErrors() {
		if (this.state.login_error != '') {
			return (
				<div className="error-msg">{this.state.login_error}</div>
			)
		}
	}
	componentWillReceiveProps(nextProps) {
		let user = nextProps.user;

		// listen to changes in user state
		if (this.props.user !== user)
        {   
        	// if login successful
            if (user.sessionId && user.sessionId != '') {
                history.push('/videos');
            }
            // show login error
            else if (user.login_error && user.login_error != '') {
            	this.setState({login_error: user.login_error});
            }
        }
	}
	render() {
		return (
			<section>
				<div className="login-tron">
					<div className="container">
						<h1 className="intro-heading">
							Welcome to <em>X-Over</em> Videos Portal
							<small>Awesome videos, reviews, ratings and more!!</small>
						</h1>
					</div>
				</div>
				
				<div className="container">
					<div className="login-wrapper">
						<div className="heading">Please login to access our videos</div>
						<form ref="loginForm" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input type="text" ref="username" name="username" className="form-control" placeholder="Username" />
							</div>
							<div className="form-group">
								<input type="password" ref="password" name="password" className="form-control" placeholder="Password" />
							</div>
							{this.handleErrors()}
							<button type="submit" className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</section>
		)
	}
}

module.exports = Login;

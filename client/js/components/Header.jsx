import React from 'react';
import { Link } from 'react-router';
import { history } from '../store';

class Header extends React.Component {
    handleLogout(e) {
        e.preventDefault();

        // dispatch logout action
        this.props.logout();
    }
    renderLogoutLink() {
        // if user is logged in add the logout link to header
        let user = this.props.user || {};

        if (user.sessionId && user.sessionId !== '') {
            return (
                <div className="text-right">
                    <a href="#" onClick={this.handleLogout.bind(this)}>
                        {user.username} (Logout)
                    </a>
                </div>
            )
        }
    }
    componentWillReceiveProps(nextProps) {
        // listen to user state change event which in this case is the logout action
        if (this.props.user !== nextProps.user && nextProps.user.sessionId == '')
            history.push('/');
    }
    render() {
        return (
            <header className='page-header'>
                <h1 className="text-center">
                    <Link to='/'>Crossover Video Portal </Link>
                    <small>By Ammar Rayess</small>
                </h1>
                {this.renderLogoutLink()}
            </header>
        )
    }
}

module.exports = Header;

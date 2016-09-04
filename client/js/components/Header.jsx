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
                <div className="logout-link">
                    <a href="#" onClick={this.handleLogout.bind(this)} className="btn btn-danger btn-sm">
                        <span className="glyphicon glyphicon-user"></span> {user.username} ( Logout )
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
            <header className='header'>
                <section className="container clearfix">
                    <div className="logo">
                        <Link to='/'>Crossover Video Portal </Link>
                        <small>By Ammar Rayess</small>
                    </div>
                    {this.renderLogoutLink()}
                </section>
            </header>
        )
    }
}

module.exports = Header;

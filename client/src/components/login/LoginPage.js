import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import {login} from '../../actions/users';
import LoginForm from './LoginForm';
import './LoginPage.css';

class LoginPage extends PureComponent {

	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {
		if (this.props.currentUser) return (
			<Redirect to="/" />
		)

		return (
			<div className='loginPage'>
				<div className='loginBox'>
					<h1>Login</h1>

					<LoginForm onSubmit={this.handleSubmit} />

					{ this.props.error && <span style={{color:'red'}}>{this.props.error}</span> }

					<Link to='/signup' ><p>singup</p></Link>

				</div>
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
    	error: state.login.error
	}
};

export default connect(mapStateToProps, {login})(LoginPage)
import React, {PureComponent} from 'react';
import './LoginForm.css';
import {Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';

export default class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	handleChange = (event) => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
  	}

	render() {
		return (
      		<div className="login-form">
				<Form onSubmit={this.handleSubmit} horizontal>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={3}>
							Email
						</Col>
						<Col sm={9}>
							<FormControl type="email" name="email" 
								value={ this.state.email || ''} 
								onChange={ this.handleChange } />
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={3}>
							Password
						</Col>
						<Col sm={9}>
							<FormControl type="password" name="password" 
								value={ this.state.password || ''	} 
								onChange={ this.handleChange } />
						</Col>
					</FormGroup>
					<FormGroup>
						
						<Button className='submitBtn' bsSize='large' type="submit">Login</Button>
						
					</FormGroup>

				</Form>
			</div>
		);
	}
}
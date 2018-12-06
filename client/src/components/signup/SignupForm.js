import React, {PureComponent} from 'react';
import {Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap'
import './SignupForm.css';

export default class SignupForm extends PureComponent {
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
      		<div className="signup-form">

				<Form onSubmit={this.handleSubmit} horizontal>

					<FormGroup controlId="formHorizontalName">
						<Col componentClass={ControlLabel} sm={3}>
							Name
						</Col>
						<Col sm={9}>
							<FormControl type="text" name="name" 
								value={ this.state.name || ''	} 
								onChange={ this.handleChange }  />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalLastName">
						<Col componentClass={ControlLabel} sm={3}>
						Last Name
						</Col>
						<Col sm={9}>
							<FormControl type="text" name="lastName" 
							value={	this.state.lastName || ''	} 
							onChange={ this.handleChange }/>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPhoneNumber">
						<Col componentClass={ControlLabel} sm={3}>
						Phone Number
						</Col>
						<Col sm={9}>
							<FormControl type="text" name="phoneNumber" 
							value={	this.state.phoneNumber || ''}
							onChange={ this.handleChange }/>
						</Col>
					</FormGroup>

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

					<FormGroup controlId="formHorizontalConfirmPassword">
						<Col componentClass={ControlLabel} sm={3}>
						Confirm password
						</Col>
						<Col sm={9}>
							<FormControl type="password" name="confirmPassword" 
							value={	this.state.confirmPassword || ''} 
							onChange={ this.handleChange } />
						</Col>
					</FormGroup>

					{
						this.state.password &&
						this.state.confirmPassword &&
						this.state.password !== this.state.confirmPassword &&
						<p style={{color:'red'}}>The passwords do not match!</p>
  					}

					<FormGroup>
						
						<Button className='submitBtn' bsSize='large' type="submit">Sign up</Button>
						
					</FormGroup>

				</Form>
      		</div>
		);
	}
}
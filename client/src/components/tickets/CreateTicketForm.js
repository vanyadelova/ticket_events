import React, {PureComponent} from 'react';
import {Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap';

export default class CreateTicketForm extends PureComponent {
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
            <div>
  			
                <Form onSubmit={this.handleSubmit} horizontal>

                    <FormGroup >
                        <Col componentClass={ControlLabel} sm={3}>
                            Description
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="description" 
                                value={ this.state.description || '' }
                                onChange={ this.handleChange }/>
                        </Col>
                    </FormGroup>

                    <FormGroup >
                        <Col componentClass={ControlLabel} sm={3}>
                            Price
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="price" 
                                value={ this.state.price || '' }
                                onChange={ this.handleChange }/>
                        </Col>
                    </FormGroup>

                    <FormGroup >
                        <Col componentClass={ControlLabel} sm={3}>
                        Image
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" name="thumbnail" 
                                value={ this.state.thumbnail || '' }
                                onChange={ this.handleChange } />
                        </Col>
                    </FormGroup>


                    <FormGroup>
                        
                        <Button className='submitBtn' bsSize='large' type="submit">Create</Button>
                        
                    </FormGroup>

                </Form>
            </div>
		);
	}
}
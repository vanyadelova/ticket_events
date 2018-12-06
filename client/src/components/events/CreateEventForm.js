import { connect } from 'react-redux';
import React from 'react'
import { createEvent } from '../../actions/events';

class CreateEventForm extends React.Component {
	state = {}

    
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    // const {name, value} = event.target
        this.setState({
            [event.target.name]: event.target.value
        })

  }

	render() {
		const initialValues = this.props.initialValues || {}
		return (
			<form onSubmit={this.handleSubmit} className='createEventForm'>
				<div>
					<label htmlFor="name">Event name</label><br/>
					<input name="name" id="name" value={
						this.state.name !== undefined ? this.state.name : initialValues.name || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="picture">Event picture</label><br/>
					<input name="picture" id="picture" value={
						this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="description">Event description</label><br/>
					<input name="description" id="description" value={
						this.state.description !== undefined ? this.state.description : initialValues.description || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="start_date">Start date</label><br/>
					<input name="start_date" id="start_date" value={
						this.state.start_date !== undefined ? this.state.start_date : initialValues.start_date || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="end">End date</label><br/>
					<input name="end_date" id="end_date" value={
						this.state.end_date !== undefined ? this.state.end_date : initialValues.end_date || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit" className='btn' onClick={this.handleSubmit}>Save</button>
			</form>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
    onSubmit: ((details) => {
        dispatch(createEvent(details))
    })
}
}

export default connect(
    null,
    mapDispatchToProps
)(CreateEventForm);

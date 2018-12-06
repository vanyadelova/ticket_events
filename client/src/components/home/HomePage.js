import React, {PureComponent} from 'react';
import {Jumbotron, Button, Tooltip, Modal, OverlayTrigger} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/users';
import {getEvents, createEvent} from '../../actions/events';
import EventsList from '../events/EventsList';
import CreateEventForm from '../events/CreateEventForm';
import './HomePage.css';

class Home extends PureComponent {
  state = {createMode: false}

  componentWillMount() {
    if (this.props.events === null) this.props.getEvents();
  }

  handleClose = () => {
    this.setState({ createMode: false });
  }

  handleShow = () => {
    this.setState({ createMode: true });
  }

  handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  render() {

    const tooltipLogout = (
      <Tooltip id="tooltip">
        <strong>Logout</strong> 
      </Tooltip>
    );

    const tooltipLogin = (
      <Tooltip id="tooltip">
        <strong>Login</strong> 
      </Tooltip>
    );
    
    return (
      <div className='main'>
       
       <Modal show={this.state.createMode} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEventForm className='createEvent' onSubmit={this.handleSubmit} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Jumbotron className='header ' style={{ backgroundImage: `url(https://www.bellshakespeare.com.au/wp-content/uploads/2016/08/2017-Events-916x261.jpg)`, backgroundPositionY: 'center', backgroundSize: 'cover'}}>
          {!this.props.authenticated && 
            <OverlayTrigger placement="bottom" overlay={tooltipLogin} >
              <Link  className='log' to='/login'><i className="fas fa-user-alt"></i></Link>
            </OverlayTrigger>}
          {this.props.authenticated && 
            <OverlayTrigger placement="bottom" overlay={tooltipLogout} >
              <a className='log' onClick={this.props.logout} alt="Login"><i className="fas fa-user-alt"></i></a>
            </OverlayTrigger>}
          
          <div className='headingsHome'>
            <h1>Get your ticket and feel safe!</h1>
            
          </div>
        </Jumbotron>
       
        <EventsList/>
        
        {this.props.authenticated && <a  className='create' onClick={this.handleShow} >Create Event</a>}
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  events: state.events === null ? null : state.events
});

export default connect(mapStateToProps, { logout, getEvents, createEvent})(Home)
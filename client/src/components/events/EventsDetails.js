import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Button, Tooltip, OverlayTrigger, Modal, Breadcrumb} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getEvents} from '../../actions/events';
import {getTicketsPerEvent, createTicket} from '../../actions/tickets';
import TicketsList from '../tickets/TicketsList';
import CreateTicketForm from '../tickets/CreateTicketForm';
import { logout} from '../../actions/users';
import './EventsDetails.css';

class EventsDetails extends PureComponent {
    state = {createMode: false}
   
    componentWillMount() {
        this.props.getTicketsPerEvent(this.props.match.params.eventId);
        if (this.props.event === null) this.props.getEvents();
    }

    handleSubmit = async (data) => {
        this.props.createTicket(this.props.match.params.eventId, data.description, Number(data.price), data.thumbnail);
        this.setState({createMode: false});
        this.props.getTicketsPerEvent(this.props.match.params.eventId);
    }
    
    handleClose = () => {
        this.setState({ createMode: false });
    }
    
    handleShow = () => {
        this.setState({ createMode: true });
    }

    render() {
        const { event, tickets }= this.props;

        if (tickets === null || event === null ) return 'Loading...';

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
            <div>
                <Modal show={this.state.createMode} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a new event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateTicketForm onSubmit={this.handleSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                

                    <Breadcrumb className='breadcrumbs'>
                        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Event</Breadcrumb.Item>
                    </Breadcrumb>

                    {!this.props.authenticated && 
                        <OverlayTrigger placement="bottom" overlay={tooltipLogin} >
                        <Link  className='log' to='/login'><i class="fas fa-user-alt"></i></Link>
                        </OverlayTrigger>}
                    {this.props.authenticated && 
                        <OverlayTrigger placement="bottom" overlay={tooltipLogout} >
                        <a className='log' onClick={this.props.logout} alt="Login"><i className="fas fa-user-alt"></i></a>
                        </OverlayTrigger>}
                    <div className="headings">
                        
                       
                    </div>
            
                
                <div id='createT' className='container'>
                    {this.props.authenticated && <Button onClick={this.handleShow} bsSize="large" block>Create Ticket</Button>}
                </div>
                
                <TicketsList eventId={this.props.match.params.eventId} />
            </div>

        );
    }
}

const mapStateToProps = (state,props) => ({
  event: state.events && state.events[props.match.params.eventId],
  authenticated: state.currentUser !== null
});

export default connect(mapStateToProps, {getTicketsPerEvent, getEvents, createTicket, logout})(EventsDetails)



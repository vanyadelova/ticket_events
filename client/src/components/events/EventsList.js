import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {getEvents} from '../../actions/events';
import './EventsList.css';

class EventsList extends PureComponent {
  state = {first: 0, last: 10 }

  componentWillMount() {
    this.props.getEvents()
  }

  render() {
    const events = this.props.events;
    console.log(this.props.events)
    if (events === null) return null;
    else {
      return (

        <div>     
                  {console.log("here")}

          <h1>EventsList</h1>   
        { /* <ListGroup className='container'>*/} 
            {this.props.events[0].map(event => (
              <Link className='eventItem' key={event.id} to={`home/events/${event.id}`} >
                { /*     <ListGroupItem header={event.name}>{event.description}</ListGroupItem>*/} 
                  <li>{event.name}</li>
              </Link>
            ))}
         { /*    </ListGroup>*/} 
          
        </div>
  
      );

    }
   
  }
}

const mapStateToProps = state => ({
  event: state.events.events,
  events: state.events === null ? null : Object.values(state.events).sort((a, b) => b.id - a.id)
});

export default connect(mapStateToProps, { getEvents})(EventsList)
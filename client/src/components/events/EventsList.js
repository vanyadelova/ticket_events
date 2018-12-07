import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {getEvents} from '../../actions/events';
import './EventsList.css';

class EventsList extends PureComponent {
  state = {first: 0, last: 10 }

  render() {
    const events = this.props.events;
    
    if (events === null) return null;
    const eventItems = events.map(event => <Link className='eventItem' key={event.id} to={`home/events/${event.id}`} >
              <ListGroupItem header={event.name}>{event.description}
                  </ListGroupItem></Link>);
    
    return (
      <div>
          
        { this.props.event.map((event) => {
          return (
            <React.Fragment>
              <h3>{event.name}</h3>
              <h5>{event.description}</h5>
              <h5>{event.startdate}</h5>
              <h5>{event.picture}</h5>
              
              
            </React.Fragment>
          )
        }
             // Replace with EventListItem component

          )
        }
        
        <ListGroup className='container'>
          {eventItems.slice(this.state.first,this.state.last)}
        </ListGroup>
        
      </div>

    );
  }
}

const mapStateToProps = state => ({
  event: state.events.events,
  events: state.events === null ? null : Object.values(state.events).sort((a, b) => b.id - a.id)
});

export default connect(mapStateToProps, { getEvents})(EventsList)
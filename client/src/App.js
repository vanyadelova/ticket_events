import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';
import HomePage from './components/home/HomePage';
import EventsDetails from './components/events/EventsDetails';
import TicketsDetails from './components/tickets/TicketsDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <main>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/" render={ () => <Redirect to="/home" /> } />
            <Route exact path="/home/events/:eventId" component={EventsDetails} />
            <Route exact path="/home/events/:eventId/tickets/:id" component={TicketsDetails} />

          </main>
        </div>
      </Router>
    )
  }
}
export default App;
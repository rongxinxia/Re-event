import React, { Component } from 'react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import NavBar from '../../features/Nav/NavBar/NavBar';
import {Container}from 'semantic-ui-react'
//import logo from '../../logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Container className='main'>
          <EventDashboard/>
        </Container>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import {Container} from 'semantic-ui-react';
import {Route,Switch} from 'react-router-dom';
import EventDetailsPage from '../../features/events/EventDetails/EventDetailsPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailsPage from '../../features/user/UserDetails/UserDetailsPage';
import SettingDashboard from '../../features/user/Settings/SettingDashboard';
import EventForm from '../../features/events/EventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import test from '../../features/test/test';
import ModalManager from '../../features/modal/modalManager';
import {UserIsAuthenticated} from '../../features/auth/authWrapper'


//import logo from '../../logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        </Switch>
        <Route path='/(.+)' render={()=>(
          <div>
          <NavBar/>
          <Container className='main'>
          <Switch>
            <Route path='/events' component={EventDashboard}/>
            <Route path='/event/:id' component={EventDetailsPage}/>
            <Route path='/manage/:id' component={UserIsAuthenticated(EventForm)}/>
            <Route path='/profile/:id' component={UserIsAuthenticated(UserDetailsPage)}/>
            <Route path='/settings' component={UserIsAuthenticated(SettingDashboard)}/>
            <Route path='/createEvent' component={UserIsAuthenticated(EventForm)}/>
          </Switch>
          </Container>
        </div>
        )}/>
      </div>
    );
  }
}

export default App;

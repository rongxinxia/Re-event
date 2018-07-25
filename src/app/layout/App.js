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


//import logo from '../../logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
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
            <Route path='/people' component={PeopleDashboard}/>
            <Route path='/profile/:id' component={UserDetailsPage}/>
            <Route path='/settings' component={SettingDashboard}/>
            <Route path='/createEvent' component={EventForm}/>
          </Switch>
          </Container>
        </div>
        )}/>
      </div>
    );
  }
}

export default App;

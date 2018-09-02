import React, { Component } from 'react';
//import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import {Container} from 'semantic-ui-react';
import {Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable'
//import EventDetailsPage from '../../features/events/EventDetails/EventDetailsPage';
//import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
//import UserDetailsPage from '../../features/user/UserDetails/UserDetailsPage';
//import SettingDashboard from '../../features/user/Settings/SettingDashboard';
//import EventForm from '../../features/events/EventForm/EventForm';
import LoadingComponent from '../../app/layout/loadingComponent'
//import test from '../../features/test/test';
import ModalManager from '../../features/modal/modalManager';
import {UserIsAuthenticated} from '../../features/auth/authWrapper';
import NotFound from './NotFound';

const AsyncHomePage = Loadable({
  loader: ()=>import('../../features/home/HomePage'),
  loading: LoadingComponent
})

const AsyncEventDashboard = Loadable({
  loader: ()=>import('../../features/events/EventDashboard/EventDashboard'),
  loading: LoadingComponent
})

const AsyncEventDetailsPage = Loadable({
  loader: ()=>import('../../features/events/EventDetails/EventDetailsPage'),
  loading: LoadingComponent
})

const AsyncEventForm = Loadable({
  loader: ()=>import('../../features/events/EventForm/EventForm'),
  loading: LoadingComponent
})

const AsyncUserDetailsPage = Loadable({
  loader: ()=>import('../../features/user/UserDetails/UserDetailsPage'),
  loading: LoadingComponent
})

const AsyncSettingDashboard = Loadable({
  loader: ()=>import('../../features/user/Settings/SettingDashboard'),
  loading: LoadingComponent
})

//import logo from '../../logo.svg';
//import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
        <Route exact path='/' component={AsyncHomePage}/>
        </Switch>
        <Route path='/(.+)' render={()=>(
          <div>
          <NavBar/>
          <Container className='main'>
          <Switch>
            <Route path='/events' component={AsyncEventDashboard}/>
            <Route path='/event/:id' component={AsyncEventDetailsPage}/>
            <Route path='/manage/:id' component={UserIsAuthenticated(AsyncEventForm)}/>
            <Route path='/profile/:id' component={UserIsAuthenticated(AsyncUserDetailsPage)}/>
            <Route path='/settings' component={UserIsAuthenticated(AsyncSettingDashboard)}/>
            <Route path='/createEvent' component={UserIsAuthenticated(AsyncEventForm)}/>
            <Route path='/error' component={NotFound}/>
          </Switch>
          </Container>
        </div>
        )}/>
      </div>
    );
  }
}

export default App;

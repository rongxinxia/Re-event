import React from 'react';
import {Grid} from 'semantic-ui-react';
import SettingNav from './SettingNav';
import {Route, Switch, Redirect} from 'react-router-dom';
import BasicPage from './BasicPage';
import PhotoPage from './PhotoPage';
import AccountPage from './AccountPage';
import AboutPage from './AboutPage';


const SettingDashboard = () => {
  return (
    <Grid>
        <Grid.Column width={12}>
            <Switch>
                <Redirect exact from='/settings' to='/settings/basic'/>
                <Route path='/settings/basic' component={BasicPage}/>
                <Route path='/settings/photo' component={PhotoPage}/>  
                <Route path='/settings/account' component={AccountPage}/> 
                <Route path='/settings/about' component={AboutPage}/>    
            </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
            <SettingNav/>
        </Grid.Column>
    </Grid>
  )
}

export default SettingDashboard

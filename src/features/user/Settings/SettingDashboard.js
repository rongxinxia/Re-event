import React from 'react';
import {Grid} from 'semantic-ui-react';
import SettingNav from './SettingNav';
import {Route, Switch, Redirect} from 'react-router-dom';
import BasicPage from './BasicPage';
import PhotoPage from './PhotoPage';
import AccountPage from './AccountPage';
import AboutPage from './AboutPage';
import {connect} from 'react-redux'
import {updatePassword} from '../../auth/authActions'

const actions={
    updatePassword
}

const mapState=(state)=>({
    providerId: state.firebase.auth.isLoaded && state.firebase.auth.providerData[0].providerId
})


const SettingDashboard = ({updatePassword,providerId}) => {
  return (
    <Grid>
        <Grid.Column width={12}>
            <Switch>
                <Redirect exact from='/settings' to='/settings/basic'/>
                <Route path='/settings/basic' component={BasicPage}/>
                <Route path='/settings/photo' component={PhotoPage}/>  
                <Route path='/settings/about' component={AboutPage}/> 
                <Route path='/settings/account' render={()=><AccountPage updatePassword={updatePassword} provider={providerId}/>}/>    
            </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
            <SettingNav/>
        </Grid.Column>
    </Grid>
  )
}

export default connect(mapState, actions)(SettingDashboard)

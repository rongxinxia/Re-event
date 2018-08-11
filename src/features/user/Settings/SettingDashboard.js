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
import {updateProfile} from '../userActions'

const actions={
    updatePassword,
    updateProfile
}

const mapState=(state)=>({
    providerId: state.firebase.auth.providerData[0].providerId,
    user:state.firebase.profile
})


const SettingDashboard = ({updatePassword,updateProfile,providerId,user}) => {
  return (
    <Grid>
        <Grid.Column width={12}>
            <Switch>
                <Redirect exact from='/settings' to='/settings/basic'/>
                <Route path='/settings/basic' render={()=><BasicPage initialValues={user} update={updateProfile}/>}/>
                <Route path='/settings/photo' component={PhotoPage}/>  
                <Route path='/settings/about' render={()=><AboutPage initialValues={user} update={updateProfile}/>}/> 
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

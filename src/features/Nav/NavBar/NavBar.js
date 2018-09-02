import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withFirebase} from 'react-redux-firebase'
import {openModal} from '../../modal/modalActions'
import {Menu,Container,Button} from 'semantic-ui-react/dist/commonjs';
import {Link, withRouter} from 'react-router-dom';
import SignoutMenu from '../Menu/SignoutMenu';
import SigninMenu from '../Menu/SigninMenu';


const actions ={openModal}
const mapState=(states)=>({
    auth: states.firebase.auth,
    profile: states.firebase.profile
})

class NavBar extends Component{

  handleSignin=()=>{
    this.props.openModal('LoginModal');
  }

  handleRegister=()=>{
    this.props.openModal('RegisterModal');
  }

  handleSignout=()=>{
    this.props.firebase.logout();
    this.props.history.push('/');
  }
    render(){
        const auth = this.props.auth;
        const sign = auth.isLoaded && !auth.isEmpty;
        const profile = this.props.profile;
        return(
                  <Menu inverted fixed="top">
                    <Container>
                      <Menu.Item as={Link} to='/' header >
                        <img src="../assets/logo.png" alt="logo" />
                        Re-vents
                      </Menu.Item>
                      <Menu.Item as={Link} to='/events' name="Events" />
                      {sign && <Menu.Item>
                        <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                      </Menu.Item>}
                      {sign ? <SigninMenu auth={auth} profile={profile} sign={this.handleSignout}/> : <SignoutMenu sign={this.handleSignin} register={this.handleRegister}/>}
                    </Container>
                  </Menu>
        );
    }
}

export default withRouter(withFirebase(connect(mapState,actions)(NavBar)))
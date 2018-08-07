import React, {Component} from 'react';
import {connect} from 'react-redux'
import {openModal} from '../../modal/modalActions'
import {Menu,Container,Button} from 'semantic-ui-react/dist/commonjs';
import {Link, withRouter} from 'react-router-dom';
import SignoutMenu from '../Menu/SignoutMenu';
import SigninMenu from '../Menu/SigninMenu';
import {logout} from '../../auth/authActions'


const actions ={openModal,logout}
const mapState=(states)=>({
    auth: states.auth
})

class NavBar extends Component{

  handleSignin=()=>{
    this.props.openModal('LoginModal');
  }

  handleRegister=()=>{
    this.props.openModal('RegisterModal');
  }

  handleSignout=()=>{
    this.props.logout();
    this.props.history.push('/');
  }
    render(){
        const auth = this.props.auth
        const sign = auth.auth;
        return(
                  <Menu inverted fixed="top">
                    <Container>
                      <Menu.Item as={Link} to='/' header >
                        <img src="../assets/logo.png" alt="logo" />
                        Re-vents
                      </Menu.Item>
                      <Menu.Item as={Link} to='/events' name="Events" />
                      <Menu.Item as={Link} to='/test' name="Test" />
                      {sign && <Menu.Item as={Link} to='/people' name="People" />}
                      {sign && <Menu.Item>
                        <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                      </Menu.Item>}
                      {sign ? <SigninMenu currentuser={auth.currentUser} sign={this.handleSignout}/> : <SignoutMenu sign={this.handleSignin} register={this.handleRegister}/>}
                    </Container>
                  </Menu>
        );
    }
}

export default withRouter(connect(mapState,actions)(NavBar))
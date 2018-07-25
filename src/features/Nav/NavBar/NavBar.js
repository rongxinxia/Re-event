import React, {Component} from 'react';
import {Menu,Container,Button} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import SignoutMenu from '../Menu/SignoutMenu';
import SigninMenu from '../Menu/SigninMenu';

class NavBar extends Component{
  state={
    auth:false
  }

  handleSignin=()=>{
    this.setState({
      auth:true
    })
  }

  handleSignout=()=>{
    this.setState({
      auth:false
    })
    this.props.history.push('/');
  }
    render(){
        const sign = this.state.auth;
        return(
                  <Menu inverted fixed="top">
                    <Container>
                      <Menu.Item as={Link} to='/' header >
                        <img src="../../../../public/assets/logo.png" alt="logo" />
                        Re-vents
                      </Menu.Item>
                      <Menu.Item as={Link} to='/events' name="Events" />
                      {this.state.auth && <Menu.Item as={Link} to='/people' name="People" />}
                      {this.state.auth && <Menu.Item>
                        <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                      </Menu.Item>}
                      {sign ? <SigninMenu sign={this.handleSignout}/> : <SignoutMenu sign={this.handleSignin}/>}
                    </Container>
                  </Menu>
        );
    }
}

export default withRouter(NavBar);
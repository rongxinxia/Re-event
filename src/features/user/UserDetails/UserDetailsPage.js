import React, {Component} from 'react';
import {Button, Grid, Segment} from "semantic-ui-react";
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import  UserHeader from './UserHeader';
import UserAbout from './UserAbout';
import UserInterest from './UserInterest';
import UserEvent from './UserEvent';
import  UserPhoto from './UserPhoto';

class UserDetailedPage extends Component {

    render() {

        return (
            <Grid>
                <Grid.Column width={16}>
                    <UserHeader profile={this.props.profile}/>
                </Grid.Column> 
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <UserAbout profile={this.props.profile}/>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <UserInterest profile={this.props.profile}/>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button color='teal' fluid basic content='Edit Profile'/>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                  <UserPhoto photos={this.props.photos}/>
                </Grid.Column>
                  <UserEvent events={this.props.events}/>
                <Grid.Column width={12}>

                </Grid.Column>
            </Grid>

        );
    }
}

const mapState=(state)=>({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading,
  events: state.events,
})

const actions={
}

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ];
};


export default compose(connect(mapState, actions), firestoreConnect(auth => query(auth)))(UserDetailedPage)
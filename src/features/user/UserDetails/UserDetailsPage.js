import React, {Component} from 'react';
import {Grid, Segment} from "semantic-ui-react";
import {connect} from 'react-redux';
import {firestoreConnect,isEmpty} from 'react-redux-firebase'
import {compose} from 'redux'
import  UserHeader from './UserHeader';
import UserAbout from './UserAbout';
import UserInterest from './UserInterest';
import UserEvent from './UserEvent';
import  UserPhoto from './UserPhoto';
import {query} from '../userQueries';
import LoadingComponent from '../../../app/layout/loadingComponent'
import {getUserEvents} from '../userActions'
//import UserSidebar from './UserSidebar'
import {toastr} from 'react-redux-toastr'

class UserDetailedPage extends Component {
    async componentDidMount(){
        let user = await this.props.firestore.get(`users/${this.props.match.params.id}`)
        if (!user.exists) {
            toastr.error('Not found', 'This is not the user you are looking for')
            this.props.history.push('/error');
        }
        await this.props.getUserEvents(this.props.userUid,3);
    }
    changeTab = (e,data) =>{
        this.props.getUserEvents(this.props.userUid,data.activeIndex)
    }
    
    render() {
        //const isCurrentUser = this.props.auth.uid === this.props.match.params.id;
        const loading = this.props.requesting[`user/${this.props.match.params.id}`]
        if(loading){
            return <LoadingComponent/>
        }
        return (
            <Grid>
                <Grid.Column width={16}>
                    <UserHeader profile={this.props.profile}/>
                </Grid.Column> 
                <Grid.Column width={16}>
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

                <Grid.Column width={12}>
                  <UserPhoto photos={this.props.photos}/>
                </Grid.Column>
                  <UserEvent events={this.props.events} eventsLoading={this.props.loading} changeTab={this.changeTab}/>
                <Grid.Column width={12}>

                </Grid.Column>
            </Grid>

        );
    }
}

const mapState=(state,ownProps)=>{
    let userUid = null;
    let profile = {};

    if(ownProps.match.params.id === state.auth.uid){
        profile = state.firebase.profile;
    }else{
        //console.log(state.firestore.ordered.profile);
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id 
    }
    return{
        auth: state.firebase.auth,
        profile: profile,
        userUid: userUid,
        photos: state.firestore.ordered.photos,
        loading: state.async.loading,
        events: state.events,
        requesting: state.firestore.status.requesting,
    }
}

const actions={getUserEvents};

export default compose(connect(mapState, actions), firestoreConnect((auth,userUid) => query(auth,userUid)))(UserDetailedPage)
import React,{Component}from 'react'
import EventDetailsChat from './EventDetailsChat';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsSiderbar from './EventDetailsSiderbar';
import EventDetailsInfo from './EventDetailsInfo';
import {Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withFirestore} from 'react-redux-firebase'
//import {toastr} from 'react-redux-toastr';
import {objectToArray} from '../../../app/common/util/helpers';
import {joinEvent,cancelJoinEvent} from '../../user/userActions'

const mapState=(state)=>{
  let event = {};
  if(state.firestore.ordered.events && state.firestore.ordered.events[0]){
    event = state.firestore.ordered.events[0];
  }
  return {event:event,auth:state.firebase.auth,}
}

const actions = {joinEvent,cancelJoinEvent};

class EventDetailsPage extends Component {
  async componentDidMount(){
    const{firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount(){
    const{firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {event,auth,joinEvent,cancelJoinEvent} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees)
    const isHost = event.isHost === auth.uid;
    const isGoing = attendees && attendees.some(a=>a.id===auth.uid);
    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} isHost={isHost} isGoing={isGoing} joinEvent={joinEvent} cancelJoinEvent={cancelJoinEvent}/>
        <EventDetailsInfo event={event}/>
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSiderbar attendees={attendees}/>
      </Grid.Column>
    </Grid>
    )
  }
}
export default withFirestore(connect(mapState,actions)(EventDetailsPage));

import React,{Component}from 'react'
import EventDetailsChat from './EventDetailsChat';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsSiderbar from './EventDetailsSiderbar';
import EventDetailsInfo from './EventDetailsInfo';
import {Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withFirestore,firebaseConnect,isEmpty} from 'react-redux-firebase'
import {compose} from 'redux'
//import {toastr} from 'react-redux-toastr';
import {objectToArray, createDataTree} from '../../../app/common/util/helpers';
import {joinEvent,cancelJoinEvent,addEventComment} from '../../user/userActions'

const mapState=(state,ownprops)=>{
  let event = {};
  if(state.firestore.ordered.events && state.firestore.ordered.events[0]){
    event = state.firestore.ordered.events[0];
  }
  //console.log(state.firebase.data.event_chat)
  return {event:event,
    auth:state.firebase.auth,
    eventChat:!isEmpty(state.firebase.data.event_chat) && objectToArray(state.firebase.data.event_chat[ownprops.match.params.id])}
}

const actions = {joinEvent,cancelJoinEvent,addEventComment};

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
    const {event,auth,joinEvent,cancelJoinEvent,addEventComment,eventChat} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees)
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a=>a.id===auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
    //console.log(eventChat)
    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} isHost={isHost} isGoing={isGoing} joinEvent={joinEvent} cancelJoinEvent={cancelJoinEvent}/>
        <EventDetailsInfo event={event}/>
        <EventDetailsChat eventChat={chatTree} addEventComment={addEventComment} eventId={event.id}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSiderbar attendees={attendees}/>
      </Grid.Column>
    </Grid>
    )
  }
}
export default compose(
  withFirestore,
  (connect(mapState,actions)),
  firebaseConnect((props)=>([`event_chat/${props.match.params.id}`]))
)(EventDetailsPage);

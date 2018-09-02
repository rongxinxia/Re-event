import React,{Component}from 'react'
import EventDetailsChat from './EventDetailsChat';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsSiderbar from './EventDetailsSiderbar';
import EventDetailsInfo from './EventDetailsInfo';
import {Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {toastr} from 'react-redux-toastr'
import {withFirestore,firebaseConnect,isEmpty} from 'react-redux-firebase'
import {compose} from 'redux'
//import {toastr} from 'react-redux-toastr';
import {objectToArray, createDataTree} from '../../../app/common/util/helpers';
import {joinEvent,cancelJoinEvent,addEventComment} from '../../user/userActions';
import {openModal} from '../../modal/modalActions' 
import LoadingComponent from '../../../app/layout/loadingComponent'

const mapState=(state,ownprops)=>{
  let event = {};
  if(state.firestore.ordered.events && state.firestore.ordered.events[0]){
    event = state.firestore.ordered.events[0];
  }
  //console.log(state.firebase.data.event_chat)
  return {
    requesting: state.firestore.status.requesting,
    event:event,
    auth:state.firebase.auth,
    eventChat:!isEmpty(state.firebase.data.event_chat) && objectToArray(state.firebase.data.event_chat[ownprops.match.params.id])}
}

const actions = {joinEvent,cancelJoinEvent,addEventComment,openModal};

class EventDetailsPage extends Component {
  state={
    initialLoading: true
  }
  async componentDidMount(){
    const{firestore, match} = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      toastr.error('Not Found', 'This is not the event are looking for');
      this.props.history.push('/error');
    }
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({initialLoading: false})
  }

  async componentWillUnmount(){
    const{firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {openModal, event,auth,joinEvent,cancelJoinEvent,addEventComment,eventChat,requesting,match} = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees).sort(function(a,b){return a.joinDate > b.joinDate})
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a=>a.id===auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
    const authed  = auth.isLoaded && !auth.isEmpty;
    const loadingEvents = requesting[`events/${match.params.id}`]
    //console.log(eventChat)
    if(loadingEvents || this.state.initialLoading){
        return (<LoadingComponent inverted={true}/>)
    }
    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader authed={authed} openModal={openModal} event={event} isHost={isHost} isGoing={isGoing} joinEvent={joinEvent} cancelJoinEvent={cancelJoinEvent}/>
        <EventDetailsInfo event={event}/>
        {authed && <EventDetailsChat eventChat={chatTree} addEventComment={addEventComment} eventId={event.id}/>}
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
  firebaseConnect((props)=>(props.auth.isLoaded && !props.auth.isEmpty &&[`event_chat/${props.match.params.id}`]))
)(EventDetailsPage);

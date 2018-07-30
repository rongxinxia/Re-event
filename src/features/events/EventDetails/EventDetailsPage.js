import React from 'react'
import EventDetailsChat from './EventDetailsChat';
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsSiderbar from './EventDetailsSiderbar';
import EventDetailsInfo from './EventDetailsInfo';
import {Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'

const mapState=(state,ownProps)=>{
  const eventId = ownProps.match.params.id;
  let event = {};
  if(eventId && state.events.length>0){
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {event}
}

const EventDetailsPage = ({event}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event}/>
        <EventDetailsInfo event={event}/>
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSiderbar attendees={event.attendees}/>
      </Grid.Column>
    </Grid>
  )
}

export default connect(mapState)(EventDetailsPage);

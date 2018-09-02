import React from 'react'
import{Segment,Image,Item,Header,Button,Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import format from 'date-fns/format'

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const EventDetailsHeader = ({authed, openModal, event,isHost,isGoing,joinEvent,cancelJoinEvent}) => {
  let eventDate ;
  if(event.date){
    eventDate = event.date.toDate();
  }
  //console.log(eventDate)
  return (
       <Segment.Group>
          <Segment basic attached="top" style={{ padding: '0' }}>
            <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle}/>
            <Segment basic style={eventImageTextStyle}>
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Header
                      size="huge"
                      content={event.title}
                      style={{ color: 'white' }}
                    />
                    <p>{format(eventDate,'dddd Do MMMM')} at{" "} {format(eventDate , 'HH:mm')}</p>
                    <p>
                      Hosted by <strong>{event.hostedBy}</strong>
                    </p>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Segment>
    
          <Segment attached="bottom">
          {!isHost && isGoing && <Button onClick={()=>cancelJoinEvent(event)}>Cancel My Place</Button>}
          {!isHost && !isGoing && authed && event.cancelled && <Button onClick={()=>joinEvent(event)}color="teal">JOIN THIS EVENT</Button>}
          {!isHost && !authed && event.cancelled &&  <Button onClick={()=>openModal('UnauthModal')}color="teal">JOIN THIS EVENT</Button>}
          {isHost &&<Button as={Link} to={`/manage/${event.id}`} color="orange" content="Manage Event"/>}
          {event.cancelled && !isHost && <Label size='large' color='red' content='This event has been cancelled'/>}
        </Segment>
        </Segment.Group>
  )
}

export default EventDetailsHeader

import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const {events,edit} = this.props;
    return (
      <div>
        <h1>EventList</h1>
        {events.map((event)=>(
            <EventListItem key={event.id} event={event} edit={edit} delete={this.props.delete}/> 
        ))}
      </div>
    )
  }
}

export default EventList;

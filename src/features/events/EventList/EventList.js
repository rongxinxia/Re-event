import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const {events} = this.props;
    return (
      <div>
        <h1>EventList</h1>
        {events.map((event)=>(
            <EventListItem key={event.id} event={event} delete={this.props.delete}/> 
        ))}
      </div>
    )
  }
}

export default EventList;

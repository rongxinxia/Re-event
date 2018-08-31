import React, { Component } from 'react';
import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';

class EventList extends Component {
  render() {
    const {getMoreevents, loading, moreEvents, events} = this.props;
    return (
      <div>
        {events && events.length!== 0 &&
        (<InfiniteScroll
        pageStart={0}
        loadMore={getMoreevents}
        hasMore={!loading && moreEvents}
        initialLoad={false}>
            {events && events.map((event)=>(
            <EventListItem key={event.id} event={event} delete={this.props.delete}/> 
        ))}
        </InfiniteScroll>)
        }
      </div>
    )
  }
}

export default EventList;

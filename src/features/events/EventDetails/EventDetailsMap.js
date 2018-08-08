import React from 'react'
import {Segment} from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react';
import {Icon} from 'semantic-ui-react'

const Marker = () => <Icon name="marker" size="big" color="red" />;

const EventDetailsMap = ({lat,lng}) => {
    const center=[lat, lng];
    const zoom = 14;
  return (

<Segment attached="bottom" style={{padding: 0}}>
<div style={{ height: '300px', width: '100%' }}>
  <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyBhH8UrB3U5ynpAct0iROf_hf69_QL8vlQ' }}
    defaultCenter={center}
    defaultZoom={zoom}
  >
    <Marker lat={lat} lng={lng} />
  </GoogleMapReact>
</div>
</Segment>
  )
}

export default EventDetailsMap
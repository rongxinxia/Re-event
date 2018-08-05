import React, { Component } from 'react'
import {connect} from 'react-redux'
import {increment_Counter,decrement_Counter} from './testActions'
import {Button,Icon} from 'semantic-ui-react'
import  Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GoogleMapReact from 'google-map-react';

class test extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };


  state = {
    address:'',
    scriptLoaded: false
  }

  handleStriptLoad=()=>{
    this.setState({scriptLoaded:true})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address)=>this.setState({address})

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhH8UrB3U5ynpAct0iROf_hf69_QL8vlQ&libraries=places"
            onLoad = {this.handleStriptLoad}
          />
          <h1> this is {this.props.data}</h1>
          <Button onClick={this.props.increment_Counter}>add</Button>
          <Button onClick={this.props.decrement_Counter}>substract</Button>
          <br/><br/>
          <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded &&<PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
          </form>

           <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBhH8UrB3U5ynpAct0iROf_hf69_QL8vlQ'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Icon name='marker' size='big' color='red' 
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}/>
        </GoogleMapReact>
      </div>
      </div>
    )
  }
}

const actions={increment_Counter,decrement_Counter};

const mapState=(state)=>({
    data: state.test.data
});


export default connect(mapState,actions)(test);

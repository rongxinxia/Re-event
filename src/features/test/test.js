import React, { Component } from 'react'
import {connect} from 'react-redux'
import {increment_Counter,decrement_Counter} from './testActions'
import {Button} from 'semantic-ui-react'
import  Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {openModal} from '../modal/modalActions'

class test extends Component {
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
          <Button onClick={()=>this.props.openModal('TestModal',{data:32})}>Modal</Button>
          <br/><br/>
          <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded &&<PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
          </form>

          
      </div>
    )
  }
}

const actions={increment_Counter,decrement_Counter,openModal};

const mapState=(state)=>({
    data: state.test.data
});


export default connect(mapState,actions)(test);

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {incrementAsync,decrementAsync} from './testActions'
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

    console.log(this.props.loading)

    return (
      <div>
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhH8UrB3U5ynpAct0iROf_hf69_QL8vlQ&libraries=places"
            onLoad = {this.handleStriptLoad}
          />
          <h1> this is {this.props.data}</h1>
          <Button loading={this.props.loading} onClick={this.props.incrementAsync} content='add' color='green'/>
          <Button loading={this.props.loading}  onClick={this.props.decrementAsync}>substract</Button>
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

const actions={incrementAsync,decrementAsync,openModal};

const mapState=(state)=>({
    data: state.test.data,
    loading: state.test.loading
});


export default connect(mapState,actions)(test);

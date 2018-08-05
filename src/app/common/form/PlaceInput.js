import React, { Component } from 'react'
import  Script from 'react-load-script'
import PlacesAutocomplete  from 'react-places-autocomplete'
import {Form, Label} from 'semantic-ui-react'

const styles = {
    autocompleteContainer:{
        zIndex:2000
    }
}

export default class PlaceInput extends Component {
    state={
        scriptLoaded: false
    }

    scriptLoadedHandler = ()=>{
        this.setState(
            {scriptLoaded:true}
        )
    }


  render() {
      const {input,onSelect,placeholder,options, meta:{touched,error}} = this.props;
    return (
        <Form.Field error={touched && !error} >
            <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhH8UrB3U5ynpAct0iROf_hf69_QL8vlQ&libraries=places"
            onLoad = {this.scriptLoadedHandler.bind(this)}
          />
          {this.state.scriptLoaded &&<PlacesAutocomplete inputProps={{...input,placeholder}}
          options={options} onSelect={onSelect} styles={styles}/>}

            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
  }
}

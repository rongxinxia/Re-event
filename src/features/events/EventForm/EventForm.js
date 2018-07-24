import React, { Component } from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'

const emptyEvent = {
    id: '',
    title: '',
    date: '',
    category: '',
    description:
      '',
    city: '',
    venue: '',
    hostedBy: '',
    hostPhotoURL: '',
    attendees: ''
}

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            event:emptyEvent
        }
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        if(this.state.event.id){
            this.props.update(this.state.event);
        }else{
            this.props.createEvent(this.state.event);
        }
    }
    onInputChange=(event)=>{
        const newEvent = this.state.event;
        newEvent[event.target.name] = event.target.value;
        this.setState({
            event:newEvent
        })
    }

    componentDidMount(){
        if(this.props.selectedEvent!==null){
            this.setState({event:this.props.selectedEvent})
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.selectedEvent !== this.props.selectedEvent){
            this.setState({event:nextProps.selectedEvent||emptyEvent})
        }
    }

  render() {
    return (
              <Segment>
                <Form onSubmit={this.onFormSubmit}>
                  <Form.Field>
                    <label>Event Title</label>
                    <input name='title' onChange={this.onInputChange} value={this.state.event.title} placeholder="Event Title" />
                  </Form.Field>
                  <Form.Field>
                    <label>Event Date</label>
                    <input name='date' type='date' onChange={this.onInputChange} value={this.state.event.date} placeholder="Event Date" />
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <input name='city' onChange={this.onInputChange} value={this.state.event.city} placeholder="City event is taking place" />
                  </Form.Field>
                  <Form.Field>
                    <label>Venue</label>
                    <input name='venue' onChange={this.onInputChange} value={this.state.event.venue} placeholder="Enter the Venue of the event" />
                  </Form.Field>
                  <Form.Field>
                    <label>Hosted By</label>
                    <input name='hostBy' onChange={this.onInputChange} value={this.state.event.hostBy}  placeholder="Enter the name of person hosting" />
                  </Form.Field>
                  <Button positive type="submit">
                    Submit
                  </Button>
                  <Button type="button" onClick={this.props.cancel}>Cancel</Button>
                </Form>
              </Segment>
    )
  }
}

export default EventForm;

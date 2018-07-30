import React, { Component } from 'react'
import {Segment, Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createEvent,updateEvent} from '../eventActions'
import cuid from 'cuid';



const mapState =(state, ownProps)=>{
    const eventId = ownProps.match.params.id;

    let event = {
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

    if(eventId && state.events.length>0){
        event = state.events.filter(event =>event.id===eventId)[0];
    }

    return {event}
};

const actions ={createEvent,updateEvent};

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            event:Object.assign({},this.props.event)
        }
    }
    onFormSubmit=(event)=>{
        event.preventDefault();
        if(this.state.event.id){
            this.props.updateEvent(this.state.event);
            this.props.history.goBack();
        }else{
            const newEvent={
                ...this.state.event,
                id:cuid(),
                hostPhotoURL:'/assets/user.png'
            }
            this.props.createEvent(newEvent);
            this.props.history.push('/events')
        }
    }
    onInputChange=(event)=>{
        const newEvent = this.state.event;
        newEvent[event.target.name] = event.target.value;
        this.setState({
            event:newEvent
        })
    }

    /*componentDidMount(){
        if(this.props.selectedEvent!==null){
            this.setState({event:this.props.selectedEvent})
        }
    }*/

    componentWillReceiveProps(nextProps){
        if(nextProps.selectedEvent !== this.props.selectedEvent){
            this.setState({event:nextProps.selectedEvent||this.props.event})
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
                  <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                </Form>
              </Segment>
    )
  }
}

export default connect(mapState,actions)(EventForm);

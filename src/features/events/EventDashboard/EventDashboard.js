import React,{Component} from 'react';
import {Grid} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {connect} from 'react-redux'
import {deleteEvent} from '../eventActions';
import LoadingComponent from '../../../app/layout/loadingComponent'

class EventDashboard extends Component {
    state = {
        isOpen:false,
        selectedEvent:null
    };

    //handleFormCancel=()=>{
      //  this.setState({isOpen:false})
   //}

    /*handleNewEvent=(newEvent)=>{
        newEvent.id=cuid();
        newEvent.hostPhotoURL='/assets/user.png';
        this.props.createEvent(newEvent);
        this.setState({isOpen:false})
    }*/

    /*handleEditEvent=(newEvent)=>{
        this.setState({
            selectedEvent:newEvent,
            isOpen:true
        });
    }*/

    handleDeleteEvent=(eventId)=>()=>{
        this.props.deleteEvent(eventId);
    }

    /*handleUpdateEvent=(updateEvent)=>{
        this.props.updateEvent(updateEvent)
        this.setState({
            isOpen:false,
            selectedEvent:null
        })
    }*/
    
    render(){
        if(this.props.loading){
            return <LoadingComponent inverted={true}/>
        }
        return(
          <Grid>
              <Grid.Column width = {10}>
                  <EventList  delete={this.handleDeleteEvent} events={this.props.events}/>
              </Grid.Column>
              <Grid.Column width = {6}>
                  
              </Grid.Column>
          </Grid>
        );
    }
}

const actions={deleteEvent};

const mapState=(state)=>({
    events: state.events,
    loading:state.async.loading
});



export default connect(mapState,actions)(EventDashboard);
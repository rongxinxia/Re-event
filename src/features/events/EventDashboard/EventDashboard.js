import React,{Component} from 'react';
import {Grid} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {connect} from 'react-redux'
import {deleteEvent} from '../eventActions';
import LoadingComponent from '../../../app/layout/loadingComponent'
import EventActivity from '../EventActivity/EventActivity'
import {firestoreConnect} from 'react-redux-firebase'

class EventDashboard extends Component {
    state = {
        isOpen:false,
        selectedEvent:null
    };

    handleDeleteEvent=(eventId)=>()=>{
        this.props.deleteEvent(eventId);
    }

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
                  <EventActivity/>
              </Grid.Column>
          </Grid>
        );
    }
}

const actions={deleteEvent};

const mapState=(state)=>({
    events: state.firestore.ordered.events,
    loading:state.async.loading
});



export default connect(mapState,actions)(firestoreConnect([{collection:'events'}])(EventDashboard));
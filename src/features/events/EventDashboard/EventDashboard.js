import React,{Component} from 'react';
import {Grid, Loader} from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import {connect} from 'react-redux'
import {getEventsForDashboard} from '../eventActions';
import LoadingComponent from '../../../app/layout/loadingComponent'
import EventActivity from '../EventActivity/EventActivity'
import {firestoreConnect,isEmpty,isLoaded} from 'react-redux-firebase'

class EventDashboard extends Component {
    state = {
        moreEvents:false,
        loadingInitial:true,
        loadedEvent: []
    };

    handleDeleteEvent=(eventId)=>()=>{
        this.props.deleteEvent(eventId);
    }

    async componentDidMount(){
        let next = await this.props.getEventsForDashboard();
        if(next && next.docs && next.docs.length > 1){
            this.setState({
                moreEvents: true,
                loadingInitial: false
            })
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        if(this.props.events!== nextProps.events){
            this.setState({
                loadedEvent:[...this.state.loadedEvent,...nextProps.events]
            })
        }
        //console.log(this.state.loadedEvent)
    }

    getNextEvent=async()=>{
        const {events} = this.props;
        let lastEvent = events && events[events.length-1];
        let next = await this.props.getEventsForDashboard(lastEvent);
        if(next && next.docs && next.docs.length <= 1){
            this.setState({moreEvents: false})
        }
    }

    render(){
        //if(this.state.loadingInitial && (isEmpty(this.props.events) || !isLoaded(this.props.events))){
          //  return <LoadingComponent inverted={true}/>
       //}
        return(
          <Grid>
              <Grid.Column width = {16}>
                  <EventList getMoreevents={this.getNextEvent} loading={this.props.loading} moreEvents={this.state.moreEvents} delete={this.handleDeleteEvent} events={this.state.loadedEvent}/>
              </Grid.Column>
              <Grid.Column width={16}>
              <Loader active={this.props.loading}/>
              </Grid.Column>
          </Grid>
        );
    }
}

const actions={getEventsForDashboard};

const mapState=(state)=>({
    events: state.events,
    loading:state.async.loading
});



export default connect(mapState,actions)(firestoreConnect([{collection:'events'}])(EventDashboard));
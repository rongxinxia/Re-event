import React, { Component } from 'react'
import {Segment, Form, Button,Grid, Header} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createEvent,updateEvent} from '../eventActions'
import {composeValidators,combineValidators,isRequired,hasLengthGreaterThan} from 'revalidate'
import cuid from 'cuid';
import {reduxForm, Field} from 'redux-form';
import moment from 'moment'
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelecInput';
import DateInput from '../../../app/common/form/DateInput';



const mapState =(state, ownProps)=>{
    const eventId = ownProps.match.params.id;

    let event = {}

    if(eventId && state.events.length>0){
        event = state.events.filter(event =>event.id===eventId)[0];
    }

    return {initialValues: event}
};

const actions ={createEvent,updateEvent};

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
    title: isRequired({message:'Please enter title'}),
    category: isRequired({message:'Please enter category'}),
    discription: composeValidators(
        isRequired({message:'Please ßenter discription'}),
        hasLengthGreaterThan(4)({message:'Please have 5 characters'}),   
    )(),
    city:isRequired('city'),
    venue:isRequired('venue'),
    date:isRequired('date'),

})

class EventForm extends Component {
   
    onFormSubmit=values=>{
        values.date = moment(values.date).format();
        if(this.props.initialValues.id){
            this.props.updateEvent(values);
            this.props.history.goBack();
        }else{
            const newEvent={
                ...values,
                id:cuid(),
                hostPhotoURL:'/assets/user.png',
                hostedBy:'Bob'
            }
            this.props.createEvent(newEvent);
            this.props.history.push('/events');
        }
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
    const {invalid,submitting,pristine} = this.props;
    return (
        <Grid>
            <Grid.Column width={10}>
            <Segment>
                <Header sub color='teal' content='Event Details'/>
                <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Field name='title' type='text' component={TextInput} placeholder='Event Title'/>
                <Field name='category' type='text' component={SelectInput} placeholder='Event Category' options={category}/>
                <Field name='description' type='text' rows={3} component={TextArea} placeholder='Event Discription'/>
                <Header sub color='teal' content='Event Location Details'/>
                <Field name='city' type='text' component={TextInput} placeholder='Event City'/>
                <Field name='venue' type='text' component={TextInput} placeholder='Event Venue'/>
                <Field name='date' type='text' component={DateInput} dateFormat="YYYY-DD-MM HH:mm" timeFormat="HH:mm" placeholder='Event Date'/>
                  <Button positive disabled={invalid||submitting||pristine} type="submit">
                    Submit
                  </Button>
                  <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
                </Form>
            </Segment>
            </Grid.Column>
        </Grid>
    )
  }
}

export default connect(mapState,actions)(reduxForm({form: 'eventForm',enableReinitialize:true,validate})(EventForm));

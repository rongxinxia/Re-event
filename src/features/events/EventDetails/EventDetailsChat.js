import React, {Component} from 'react'
import {Segment,Header,Comment} from 'semantic-ui-react'
import EventDetailsChatForm from './EventDetailsChatForm'
import {Link} from 'react-router-dom'
import distanceInWords from 'date-fns/distance_in_words'

class EventDetailsChat extends Component{
  state={
    showReplyForm: false,
    selectedId:null
  }

  handleOpenReplyForm=(id)=>()=>{
      this.setState({
        showReplyForm:true,
        selectedId:id
      })
  }

  handleCloseReplyForm=()=>{
    this.setState({
      showReplyForm:false,
      selectedId:null
    })
}
  
  render(){
    const {addEventComment, eventId, eventChat} = this.props;
    const {showReplyForm, selectedId} = this.state;
    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: 'none' }}
        >
          <Header>Chat about this event</Header>
        </Segment>
  
        <Segment attached>
          <Comment.Group>
            {eventChat && eventChat.map((comment)=>(
                <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/ptofile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                  <Comment.Metadata>
                    <div>{distanceInWords(comment.date, Date.now())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>Reply</Comment.Action>
                    {showReplyForm && selectedId===comment.id &&
                      <EventDetailsChatForm  addEventComment={addEventComment} 
                      eventId={eventId} 
                      form={`reply_${comment.id}`} 
                      closeForm={this.handleCloseReplyForm}
                      parentId={comment.id}/>
                    }
                  </Comment.Actions>
                </Comment.Content>

                {comment.childNodes && comment.childNodes.map((child)=>(
                  <Comment.Group key={child.id}>
                  <Comment >
                  <Comment.Avatar src={child.photoURL} />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/ptofile/${child.uid}`}>{child.displayName}</Comment.Author>
                    <Comment.Metadata>
                      <div>{distanceInWords(child.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{child.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={this.handleOpenReplyForm(child.id)}>Reply</Comment.Action>
                      {showReplyForm && selectedId===child.id &&
                        <EventDetailsChatForm  addEventComment={addEventComment} 
                        eventId={eventId} 
                        form={`reply_${child.id}`} 
                        closeForm={this.handleCloseReplyForm}
                        parentId={child.parentId}/>
                      }
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
                  </Comment.Group>
                ))}

              </Comment>
            ))}
          </Comment.Group>
          <EventDetailsChatForm  addEventComment={addEventComment} eventId={eventId} form={'newComment'} parentId={0}/>
        </Segment>
      </div>
)
  }
}

export default EventDetailsChat

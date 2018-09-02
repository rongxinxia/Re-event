import React from 'react'
import {Segment, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const UserSidebar = ({isCurrentUser, isFollowing,following, unfollowing, profile}) => {
  return (
    <Segment>
        {isCurrentUser &&<Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>}
        {!isCurrentUser && !isFollowing && <Button onClick={() => following(profile)} color='teal' fluid basic content='Follow User'/>}
        {!isCurrentUser && isFollowing && <Button onClick={() => unfollowing(profile)} color='teal' fluid basic content='Unfollow User'/>}
    </Segment>
  )
}

export default UserSidebar

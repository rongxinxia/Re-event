import React from 'react'
import {Header} from 'semantic-ui-react'
import format from 'date-fns/format'

const UserAbout = ({profile}) => {
    let createdAt;
    if(profile.createdAt){
        createdAt = format(profile.createdAt.toDate(), 'MM/DD/YYYY')
    }
  return (
    <div>
    <Header icon='smile' content='About Display Name'/>
    <p>I am a: <strong>{profile.occupation || 'tbn'}</strong></p>
    <p>Originally from <strong>{profile.city || 'tbn'}</strong></p>
    <p>Member Since: <strong>{createdAt || 'tbn'}</strong></p>
    <p>Description of user</p>
    </div>
  )
}

export default UserAbout

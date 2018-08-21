import React from 'react'
import {Segment, Item, Header} from 'semantic-ui-react'
import differenceInYears from 'date-fns/difference_in_years';

const UserHeader = ({profile}) => {
    let age;
    if(profile.dateOfBirth){
        age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
    }
  return (
    <Segment>
        <Item.Group>
            <Item>
            <Item.Image avatar size='small' src={profile.photoURL}/>
            <Item.Content verticalAlign='bottom'>
            <Header as='h1' content={profile.displayName}></Header>
            <br/>
            <Header as='h3' content={profile.occupation}></Header>
            <br/>
            <Header as='h3'content={`${age}, Lives in ${profile.city}`}></Header>
            </Item.Content>
            </Item>
        </Item.Group>

    </Segment>
  )
}

export default UserHeader

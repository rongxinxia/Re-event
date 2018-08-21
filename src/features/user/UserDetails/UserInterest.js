import React from 'react'
import {Header,List,Item,Icon}from 'semantic-ui-react'

const UserInterest = ({profile}) => {
  return (
    <div>
    <Header icon='heart outline' content='Interests'/>
        <List>
            {profile.interets &&
            profile.interets.map((interest,index)=>{
                return(
                    <Item key={index}>
                    <Icon name='heart'/>
                    <Item.Content>{interest}</Item.Content>
                    </Item>
                )
            })
            }
        </List>
    </div>
  )
}

export default UserInterest

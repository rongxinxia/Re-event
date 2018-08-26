import React from 'react'
import {Segment,Header,Image} from 'semantic-ui-react'
import LazyLoad from 'react-lazyload'

const UserPhoto = ({photos}) => {
  return (
    <Segment attached>
        <Header icon='image' content='Photos'/>
        <Image.Group size='small'>
        {photos && photos.map((photo)=>(
          <LazyLoad key={photo.id} height={150} offset={0} placeholder={<Image src='/assets/user.png'/>}>
            <Image src={photo.url}/>
          </LazyLoad>))}
        </Image.Group>
    </Segment>
  )
}

export default UserPhoto

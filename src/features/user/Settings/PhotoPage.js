import React, {Component} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card,Icon} from 'semantic-ui-react';
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import {uploadUserImage,deletePhoto,setMainPhoto} from '../userActions'
import {toastr} from 'react-redux-toastr'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'



class PhotosPage extends Component {
    state={
      files:[],
      fileName:'',
      cropResult: null,
      image:{}
    }

    uploadImage = async() =>{
        try{
            await this.props.uploadUserImage(this.state.image, this.state.fileName);
            this.cancelCrop();
            toastr.success("Success",'Photo has been uploaded');
        }catch(error){
            //console.log(error)
            toastr.error('Oops', error.message);
        }
    }

    cancelCrop=()=>{
        this.setState({
            files:[],
            image:{}
        })
    }

    onDrop=(files)=>{
      this.setState({
        files:files,
        fileName:files[0].name
      })
    }

    cropImage = () => {
      if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') return;
  
      this.refs.cropper.getCroppedCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          cropResult: imageUrl,
          image: blob
        });
      }, 'image/jpeg');
    };

    photoDelete =(photo) =>async()=>{
        try{
            this.props.deletePhoto(photo);
        }catch(error){
            //console.log(error)
            toastr.error('Error', error.message)
        }
    }

    setMainPhoto = (photo) =>async()=>{
        try{
            this.props.setMainPhoto(photo);
        }catch(error){
            toastr.error('Error', error.message);
        }
    }

    render() {
        let filterPhotos;
        if(this.props.photos){
            filterPhotos = this.props.photos.filter(photo=>{
                return photo.url !== this.props.profile.photoURL
            })
        }
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                          <div style={{paddingTop:'40px', textAlign:'center'}}>
                            <Icon name='upload' size="huge"/>
                            <Header content='Drop photo'/>
                          </div>
                        </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                        {this.state.files[0] && <Cropper 
                         style={{ height: 200, width: '100%' }}
                         ref="cropper"
                         src={this.state.files[0].preview}
                         aspectRatio={1}
                         viewMode={0}
                         dragMode="move"
                         guides={false}
                         scalable={true}
                         cropBoxMovable={true}
                         cropBoxResizable={true}
                         crop={this.cropImage}
                        />}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />
                        {this.state.files[0] && 
                        <div>
                        <Image style={{minWidth:'200px', minHeight:'200px'}} src={this.state.cropResult}/>
                        <Button.Group>
                            <Button loading={this.props.loading} onClick={this.uploadImage} style={{width:'100px'}} positive icon='check'/>
                            <Button disabled={this.props.loading} onClick={this.cancelCrop} style={{width:'100px'}} icon='close'/>
                        </Button.Group>
                        </div>
                        }
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub color='teal' content='All Photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src={this.props.profile.photoURL || '/assets/user.png'}/>
                        <Button positive >Main Photo</Button>
                    </Card>

                    {filterPhotos && filterPhotos.map((photo)=>(
                        <Card key={photo.id}>
                        <Image
                            src={photo.url}
                        />
                        <div className='ui two buttons'>
                            <Button loading={this.props.loading} onClick={this.setMainPhoto(photo)} basic color='green'>Main</Button>
                            <Button onClick={this.photoDelete(photo)} basic icon='trash' color='red' />
                        </div>
                    </Card>
                        
                    ))}

                </Card.Group>
            </Segment>
        );
    }
}

const actions={
    uploadUserImage,
    deletePhoto,
    setMainPhoto
}

const mapState=(state)=>({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
})

const query = ({ auth }) => {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  };

  export default compose(connect(mapState, actions), firestoreConnect(auth => query(auth)))(
    PhotosPage
  );
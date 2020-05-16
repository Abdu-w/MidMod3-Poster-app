import React, { Component } from 'react'
import { GoFileMedia } from "react-icons/go";
// import { Redirect } from 'react-router-dom'

export default class HomePage extends Component{
    constructor(props) {
      super(props)
      this.state = {
        upload: []
      }
      this.myRef = React.createRef();
    }

    handleImgUpload = (e) => {
      let file = this.refs.file.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        this.setState({
            upload: [...this.state.upload, reader.result]
        })
      }.bind(this);
    }

    deletePhoto = (e) => {
      this.setState({
        upload: []
      })
    }
    
    render(){

      return(
          <div className='UploadPage'> 
          <h1>Add a poster</h1>
          <div className='button-wrap'>
            <input 
                id='file'
                ref="file" 
                name="imageFile"
                type="file" 
                alt="Uploaded Image" 
                value={this.state.img} 
                onChange={this.handleImgUpload}
                />    
              <label for='file'> 
              <GoFileMedia/>
              {this.state.upload.length >= 1 ?
               "Add" :
                "upload here "}
              </label>
       
          </div>

          <br />

          {
          this.state.upload.length
          ? <LoadImage 
              upload={this.state.upload}
              deletePhoto={this.deletePhoto}
              />
          : null 
          }
       </div>
      )
    } 
}

function LoadImage(props){  
  return (
   <div className='imgContainer'>
     <img  className='posterImg' src={props.upload} 
     style={{height:500,
      width:450
     }} />

     <br />
     <button className="deletBtn" onClick={props.deletePhoto}>delete photo</button>
   </div>
 )
}
import React, { Component, createRef } from 'react';
import { GoFileMedia } from "react-icons/go";
import '../styles/Upload.css';

export default class Upload extends Component{
  constructor(props) {
    super(props)
    this.state = {
      upload: [],
      count: 0,
    }

    this.myRef = createRef();
  }
  componentDidMount() {
    let masterData = localStorage.getItem('master')
    if(masterData) {
      let data = masterData.split(',')
      data.shift()
      this.setState({
        upload: data.map(n => `key-${n}`),
        count: data.length - 1
      })
    }
  }
  handleImgUpload = (e) => {
    let file = this.refs.file.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const { count, upload } = this.state 
      const imgKey = `key-${count}`     
      localStorage.setItem(imgKey, reader.result)       
      
      let masterData = localStorage.getItem('master')
      if(masterData) {
        localStorage.setItem('master', `${masterData},${count}`) 
      } else {
        localStorage.setItem('master', `,${count}`)
      }
      
      this.setState({
        count: count + 1, 
        keyNums: [count],
        upload: [...upload, imgKey] 
      })
    }.bind(this);
  } 

  deletePhoto = (imgKey) => {
    const { upload } = this.state   
    localStorage.removeItem(imgKey) 
    
    let masterData = localStorage.getItem('master').split(',')
    masterData.shift()
    let newMaster = masterData.filter(num => num !== imgKey[imgKey.length - 1])
    const check = newMaster.length ? `,${newMaster.join(',')}` : ''
    localStorage.setItem('master', check)
    this.setState({
      upload: upload.filter(elm => elm !== imgKey) 
    })
  }
  
  render(){
    console.log(this.state)
    return(
      <div className='image-upload'> 
        <h1 className='heading'>Add a Poster</h1>
        <div className='btn-container'>
          <input 
              id='file'
              ref="file" 
              name="imageFile"
              type="file" 
              alt="Uploaded Image" 
              className="upload-btn"
              onChange={this.handleImgUpload}
              />    
            <label htmlFor='file'> 
              <GoFileMedia/>
              { 
                this.state.upload.length >= 1 
                ? "add more" 
                : "upload here"
              }
            </label>
        </div>

        {
        this.state.upload.length ? 
          this.state.upload.map(imgKey => {
            return <LoadImage 
              imgSrc={localStorage.getItem(imgKey)}
              deletePhoto={() => this.deletePhoto(imgKey)}
            />
          }) 
        : null 
        }
      </div>
    )
  } 
}

function LoadImage(props){  
  return (
    <div className='img-container'>
     <img className='poster-img' src={props.imgSrc} style={{ height: 500, width: 300 }} />
     <br />
     <button className="delete-btn" onClick={props.deletePhoto}>x</button>
   </div>
 )
}

// source to read img : https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react
// source: browser API: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
// source for web storage api error handleing :
//https://flaviocopes.com/web-storage-api/#storage-size-limits
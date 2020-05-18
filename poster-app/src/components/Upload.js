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
    //upload button fixed on ref
    this.myRef = createRef();
  }
  // need to keep/access a master varible stored in browser  
  componentDidMount() {
    let masterData = localStorage.getItem('master')
    //if masterDate exist , null will throw an error 
    if(masterData) {
      // can make an new array with ','  and remove data[0]==','
      let data = masterData.split(',')
      data.shift()
      this.setState({
        //upload will retain browser's localstorage keys
        upload: data.map(n => `key-${n}`),
        count: data.length - 1
      })
    }
  }
  // source to read img : https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react
  handleImgUpload = (e) => {
    let file = this.refs.file.files[0];
  // source: browser API: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const { count, upload } = this.state // { #, [] } = state
      const imgKey = `key-${count}`

      // source for web storage api error handleing :
      //https://flaviocopes.com/web-storage-api/#storage-size-limits
      localStorage.setItem(imgKey, reader.result)  // key-1: long-string...4lht57hgjk

      
      //   try {
        // localStorage.setItem(imgKey, reader.result) 
      // } catch (domException) {
      //   if (
      //     ['QuotaExceededError', 'NS_ERROR_DOM_QUOTA_REACHED'].includes(
      //       domException.name
      //     )
      //   ) {
      //     localStorage.clear()
      //   }
      // }
      
      //check master data 
      let masterData = localStorage.getItem('master')
      // if exist add a key add counter as unique value
      if(masterData) {
        // ',' need later if page refesh
        localStorage.setItem('master', `${masterData},${count}`) 
      } else {
        localStorage.setItem('master', `,${count}`)
      }
      
      this.setState({
          count: count + 1, 
          keyNums: [count],
          upload: [...upload, imgKey] // [key-1, key-2, ...]
      })
    }.bind(this);
  }
  //passing the targeted key as argument 
  deletePhoto = (imgKey) => {
    const { upload } = this.state  // destructure key 
    localStorage.removeItem(imgKey) 

    //assumption master data is allready populated and converting it into an  array 
    let masterData = localStorage.getItem('master').split(',')
    // remove the first ',' in array 
    masterData.shift()
    // filter the target key and join masterData back to string 
    let newMaster = masterData.filter(num => num !== imgKey[imgKey.length - 1])
    const check = newMaster.length ? `,${newMaster.join(',')}` : ''
    localStorage.setItem('master', check)
    // removes targeted key and return  array  
    this.setState({
      upload: upload.filter(elm => elm !== imgKey) // keep or don't keep
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

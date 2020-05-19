import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import ErrorMessage from './ErrorMessage';
import Carousel from 'react-bootstrap/Carousel' 
//import Carousel from 'react-bootstrap'


const API_KEY=process.env.REACT_APP_API_KEY;
console.log(process.env.REACT_APP_API_KEY)

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayResults: '',
            displayData:[ ],
            img: '',
            searchText:'',
            resultLength: ''
        }
    }
 
    componentDidMount(){
        this.searchRequest();
    }
    
    searchRequest = async () =>{
        console.log(API_KEY)
        try{
            // const response = await axios.get("https://api.pexels.com/v1/search?query=people",
            // {headers: {
            //     "Authorization" : API_KEY
            //   }
            // })
            console.log(this.state.searchText)
            const searchText = this.state.searchText;
            const response = await axios.get("https://api.pexels.com/v1/search?query=trees" ,
            {headers: {
                "Authorization" : API_KEY
              }
            })
            console.log(response);
            console.log(response.data);
            console.log(response.data.total_results);
            // console.log(response.data.photos.src.portrait);
            // let url=JSON.stringify(response.data.photos[0].src.portrait);
            // let url=response.data.photos[0].src.portrait;
            //console.log(url)
        // this.setState({img : url});
        let resultLength = response.data.total_results;
        let url=response.data.photos;
        
            this.setState({displayData : url});
            
       }
        catch(e){
            console.log(e);
        }
    }
    render() {
        console.log(this.state.displayData );
        //let response = this.state.displayData;
        return (
            <React.Fragment>

                {/* <Form className="search-container">
                    <FormControl type="text" value={this.state.searchText} id="search-text" onChange={this.searchText} placeholder="search text" />
                    <Button  id="search-button" onClick={this.handleSearch}>Search</Button>
                </Form> */}
                {/* <div className="results-container"> 
                {this.state.displayData.map((result) => {
                    return(
                        <div className="poster-results"><ul key= {result.id} className="lists-display">
                        <li className="results-li"> <img src= {result.src.portrait} alt="different Images" height = "400px" width="260px" /></li>
                        </ul> </div>)
                    } )
                }  
                </div> */}
                {/* <Carousel>
               {this.state.displayData.map((result) =>(
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={result.src.portrait} 
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>)
               )}
</Carousel> */}
<div style={{ margin: "100px" , 'display' : 'flex', justifyContent: "center"}}>

              <Carousel className="carousel-container" style={{'height':"500px", 'width' : "700px" , 
                        }} >
               {this.state.displayData.map((result) =>{
                    return(
                        <Carousel.Item className="carousel-item">
                          <img style={{'height':"500px" , 'width': "570px", 'padding' : '40px', 'marginLeft' : '65px'}} 
                          
                          src={result.src.portrait} 
                          alt="First slide"  
                        />  </Carousel.Item  > )
               }     
                ) }
               </Carousel>
</div>
               </React.Fragment>
        )
            }
    }


    // References : Looping through React bootstrap carousel items
    // https://stackoverflow.com/questions/59205796/how-do-i-loop-react-bootstrap-carousel-items
    //https://www.c-sharpcorner.com/article/how-to-use-bootstrap-carousel-in-reactjs/ - How to Use Bootstrap Carousel in ReactJS

import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import ErrorMessage from './ErrorMessage';
import Carousel from 'react-bootstrap/Carousel'

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
            const searchText = this.state.searchText;
            const response = await axios.get("https://api.pexels.com/v1/search?query=nature" ,
            {headers: {
                "Authorization" : API_KEY
              }
            })
            let resultLength = response.data.total_results;
            let url=response.data.photos;
        
            this.setState({displayData : url});
            
       }
        catch(e){
            console.log(e);
        }
    }
    render() 
            {
                return (
            <React.Fragment>
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

import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Home.css'

const API_KEY=process.env.REACT_APP_API_KEY;
console.log(process.env.REACT_APP_API_KEY)

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayResults: '',
            displayData:[ ],
            img: ''
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
            const response = await axios.get("https://api.pexels.com/v1/search?query=nature",
            {headers: {
                "Authorization" : API_KEY
              }
            })
            console.log(response);
            console.log(response.data);
            // console.log(response.data.photos);
            // console.log(response.data.photos.src.portrait);
            // let url=JSON.stringify(response.data.photos[0].src.portrait);
            // let url=response.data.photos[0].src.portrait;
            //console.log(url)
        // this.setState({img : url});
        let url=response.data.photos;
        this.setState({displayData : url});
            
        }
        catch(e){
            console.log(e);
        }
    }
    render() {
        console.log(this.state.displayData )
        return (
            <div>
                <div className="results-container"> {this.state.displayData.map((result) => <div className="poster-results"><ul key= {result.id} className="lists-display">
                    <li className="results-li"><img src= {result.src.portrait} alt="different Images" height = "500px" width="300px" /> <h5>Poster ID: {result.id} </h5>  <h5>View Details</h5> </li>
                   
                </ul>

                </div>)} </div>
               {/* {this.searchRequest()} */}
               {/* <img src = "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" /> */}
              
            </div>
        )
    }
}


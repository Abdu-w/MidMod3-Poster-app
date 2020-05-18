import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import ErrorMessage from './ErrorMessage';
import {Form, FormControl, Button} from "react-bootstrap";

const API_KEY=process.env.REACT_APP_API_KEY;

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
    
     searchText = (e) =>{
            e.preventDefault();
            console.log(e.target.value);
            this.setState({searchText : e.target.value})
     }

     handleSearch = (e) =>{
        e.preventDefault();
        console.log(this.state.searchText);
        this.searchRequest();
    }

    searchRequest = async () =>{
        console.log(API_KEY)
        try{
            const searchText = this.state.searchText;
            const response = await axios.get("https://api.pexels.com/v1/search?query=" +searchText ,
            {headers: {
                "Authorization" : API_KEY
              }
            })
        let resultLength = response.data.total_results;
        let url=response.data.photos;
            if(resultLength >0){
                this.setState({displayData : url});
                this.setState({resultLength : false})
            }
            else{
                this.setState({resultLength : true})        
            }
        }
            catch(e){
                console.log(e);
            }
        }
    render() {
        let response = this.state.displayData;
        return (
            <React.Fragment>
                <Form className="search-container">
                    <FormControl type="text" value={this.state.searchText} id="search-text" onChange={this.searchText} placeholder="search text" />
                    <Button  id="search-button" onClick={this.handleSearch}>Search</Button>
                </Form>
                <div className="results-container"> 
                {
                    this.state.resultLength ? <ErrorMessage /> : 
                    response.map((result) => {
                        return (
                        <div className="poster-results"><ul key= {result.id} className="lists-display">
                        <li className="results-li"> <img src= {result.src.portrait} alt="different Images" height = "400px" width="260px" /> <h5>Poster ID: {result.id} </h5> <Button id="view-details" variant="link">View Details</Button>  </li>
                        </ul> </div>)
                    } )
                }
                </div>
             </React.Fragment>
        )
    }
}


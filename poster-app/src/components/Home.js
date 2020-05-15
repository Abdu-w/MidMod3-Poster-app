import React, { Component } from 'react';
import axios from 'axios';

const API_KEY=process.env.REACT_APP_API_KEY;
console.log(process.env.REACT_APP_API_KEY)

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayResults: '',
            displayData:[ ]
        }
    }
 
    componentDidMount(){
        this.searchRequest();
    }
    searchRequest = async () =>{
        console.log(API_KEY)
        try{
            const response = await axios.get("https://api.pexels.com/v1/search?query=people",
            {headers: {
                "Authorization" : "API_KEY"
              }
            })

            console.log(response);
        }
        catch(e){
            console.log(e);
        }
    }
    render() {
        return (
            <div>
                Home Page
            </div>
        )
    }
}


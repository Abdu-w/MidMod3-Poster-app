import React, { Component } from 'react';
import axios from 'axios';

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
        try{
            const response = await axios.get("https://api.pexels.com/v1/search?query=people",
            {headers: {
                "Authorization" : "563492ad6f917000010000015008be4df3b241218cce3609bd4ab108"
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


import React, { Component } from 'react';
import '../styles/About.css';

export class About extends Component {
    render(){
        return(
            <div className = 'text-container'>
                <div className = 'text-child'>
                    <p>Poster Maker has moved it's retail operations online! 
                        For years we have served the public poster making needs from our retail store, 
                        and are proud to be able to serve many more. You can now browse our poster inventory, or upload 
                        your own image for print preview! 
                        <br/>
                        <br/>
                        Check back here for new updates, and 
                        feel free to leave a comment, suggestion or question in our 
                        <a className ='comment-anchor' 
                        href={`http://localhost:3000/comment`}>  
                        comments
                        </a> section.
                        <br/>
                        <br/>
                    </p>
                </div>
            </div>
        )
    }
}

export default About;

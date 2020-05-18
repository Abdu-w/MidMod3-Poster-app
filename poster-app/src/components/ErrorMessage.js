import React from 'react';
import '../styles/ErrorMessage.css'

// stateless function that displays error message when there is no search result
export default function ErrorMessage(props) {
    return (
        <div className="error-message">
         <h1>   We couldn't find anything. Try refining you search text </h1>
        </div>
    )
}

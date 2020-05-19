import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Navigation from './components/Navigation'

function App() {
  return (
   <div>
     <Navigation />
     {/* <Home/> */}
    </div>
  );
}

export default App;

//https://stackoverflow.com/questions/45598854/passing-values-through-react-router-v4-link
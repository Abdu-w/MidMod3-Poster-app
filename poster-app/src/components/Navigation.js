import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Upload from './Upload';
import About from './About';
import ViewDetail from './ViewDetail';
import Search from './Search';
import '../styles/Navigation.css'

function Navigation() {
	return (
		<Router>
			<nav className="container">
			<div className= "logo">Poster Maker</div>
				<ul className="navbar">
					<li>
						<Link to = "/home">Home</Link>
					</li>
					<li>
						<Link to = "/search">Search</Link>
					</li>
					<li>
						<Link to= "/upload">Upload</Link>
					</li>
					<li>
						<Link to = "/about">About</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route exact path="/home" component={Home}></Route>
				<Route exact path="/search" component={Search}></Route>
				<Route exact path="/upload" component={Upload}></Route>
				<Route exact path="/about" component={About}></Route>
				<Route exact path="/viewDetail" component={ViewDetail}></Route>
			</Switch>
		</Router>
	);
}

export default Navigation;

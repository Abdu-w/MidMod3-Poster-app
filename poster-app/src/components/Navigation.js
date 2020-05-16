import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Upload from './Upload';
import About from './About';

function Navigation() {
	return (
		<Router>
			<nav className="container">
				<ul className="navbar">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/rights">Upload</Link>
					</li>
					<li>
						<Link to="/stakeholders">About</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/upload" component={Upload}></Route>
				<Route exact path="/about" component={About}></Route>
			</Switch>
		</Router>
	);
}

export default Navigation;

import React, { Component } from 'react';
import logo from './logo.svg';
import UserInformation from './UserInformation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
	this.state = { 
		user: {},
		clickedButton: false
	}
  }

  getUserInformation() {
    /*
      TODO: fetch a user from the GitHub API
      TIPS:
       1) The Fetch API provides an interface for
         fetching resources (including across the network).
       2) Maybe you want to update the state here.
    */

	this.setState({
		...this.state,
		clickedButton: true
	})

   fetch('https://api.github.com/users/microsoft')
   .then( response => {
		if (!response.ok) { throw response }
		return response.json()
	})
	.then( result => {
		this.setState({
			user: {
			 name: result.login,
			 img: result.avatar_url   
			}
		});
	})
	.catch( err => {
		err.text().then( errorMessage => {
			this.setState({
				user: {...this.state.user},
				error: errorMessage
			});
		})
	})

   fetch('https://api.github.com/users/microsoft/repos')
   .then( response => {
		if (!response.ok) { throw response }
		return response.json()
	})
	.then( result => {
		this.setState({
			user: {
				...this.state.user,
				repos: result
			}
		});
	})
	.catch( err => {
		err.text().then( errorMessage => {
			this.setState({
				user: {...this.state.user},
				error: errorMessage
			});
		})
	})
  }

  render() {
	let hideButton;
	if(!this.state.clickedButton) {
		hideButton = <button id='fetch-button' onClick={this.getUserInformation.bind(this)}>
						Click me
					</button>;
	} else {
		hideButton = undefined;
	}
	
	let infoToShow;
	if(this.state.error){
		infoToShow = <div>{this.state.error}</div>
	} else if(this.state.user.repos && this.state.user.name){
		let nameToShow = <div className="text-left text-image">
						<img className="small-image" src={this.state.user.img} alt="user"></img>
						<h1>{this.state.user.name}</h1>
					</div>
		let reposToShow = this.state.user.repos.map((repo, index) =>
				<UserInformation key={index} name={repo.name} description={repo.description}/>
				)
		infoToShow = <div>
						<div>{nameToShow}</div>
						<div>{reposToShow}</div>
					</div>
	} else{
		infoToShow = <div>Display the user information here</div>;
	}

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="App-intro">
          <hr />
          <p>Click on the button to fetch the user information</p>
          {hideButton}
        </div>
		<Container>
			<Row>
				<Col>
					<div>
						{infoToShow}
					</div>
				</Col>
			</Row>
		</Container>
		
      </div>
    );
  }
}

export default App;
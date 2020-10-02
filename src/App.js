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
    this.state = { user: {} }
  }

  getUserInformation() {
    /*
      TODO: fetch a user from the GitHub API
      TIPS:
       1) The Fetch API provides an interface for
         fetching resources (including across the network).
       2) Maybe you want to update the state here.
    */

   fetch('https://api.github.com/users/microsoft')
   	.then(res => res.json())
   	.then(
   		(result) => {
   			this.setState({
   				user: {
					name: result.login,
					img: result.avatar_url   
   				}
   			});
   		},
   		(error) => {
   			this.setState({
   				error
   			});
   		}
   	)

   fetch('https://api.github.com/users/microsoft/repos')
   	.then(res => res.json())
   	.then(
   		(result) => {
   			let reposArr = [];
   			Object.keys(result).forEach(key => {
   				reposArr.push(result[key]);
   				this.setState(prevState => ({
   					user: {
						name: prevState.user.name,
						img: prevState.user.img,
   						repos: reposArr
   					}
   				}))
   			});
   		},
   		(error) => {
   			this.setState({
   				error
   			});
   		}
	   )
	   
	   document.getElementById('fetch-button').classList.toggle('hidden');
  }

  render() {
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
          <button id='fetch-button' onClick={this.getUserInformation.bind(this)}>
            Click me
          </button>
        </div>
		<Container>
			<Row>
				<Col>
					<div className="text-left text-image">
						<img className="small-image" src={this.state.user.img}></img>
						<h1>{this.state.user.name}</h1>
					</div>
					<div>
						{this.state.user.repos !== undefined ? this.state.user.repos.map((repo, index) =>
						<UserInformation key={index} name={repo.name} description={repo.description}/>
						) : 
						<div>
							Display the user information here
						</div>}
					</div>
				</Col>
			</Row>
		</Container>
		
      </div>
    );
  }
}

export default App;
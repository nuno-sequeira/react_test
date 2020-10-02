import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInformation from './UserInformation';

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
   			console.log(result.login);
   			this.setState({
   				user: {
   					name: result.login,
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
          <button onClick={this.getUserInformation.bind(this)}>
            Click me
          </button>
        </div>
        <UserInformation />
      </div>
    );
  }
}

export default App;
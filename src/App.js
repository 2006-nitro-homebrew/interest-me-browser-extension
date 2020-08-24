import React, { Component } from "react";
import LoginRegister from "./LoginRegister"
import SaveArticle from "./SaveArticle"
import fire from './secrets.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      showLogin : true,
      user : {}
    };
    this.showLogin = this.showLogin.bind(this)
    this.showRegister = this.showRegister.bind(this)
    this.authListener = this.authListener.bind(this)
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('THIS IS THE USER --->' , user)
        this.setState({user});
        localStorage.setItem('user', user.uid)
      } else {
        this.setState({user : null});
        localStorage.removeItem('user')
      }
    })
  }

  showLogin() {
    this.setState({showLogin: true})
  }

  showRegister() {
    this.setState({showLogin: false})
  }

  render() {
    return ( this.state.user ?
      <SaveArticle />
      :
      <div id='app'>
        <h3 onClick={this.showLogin}>Login</h3>
        <h3 onClick={this.showRegister}>Register</h3>
        <LoginRegister showLogin={this.state.showLogin} />
      </div>
    );
  }
}

export default App;

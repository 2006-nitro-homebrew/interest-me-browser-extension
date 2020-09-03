import React, { Component } from "react";
import LoginRegister from "./LoginRegister"
import SaveArticle from "./SaveArticle"
import fire from './secrets.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      showLogin : true,
      clickedLogin: 'on',
      clickedRegister: 'off',
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
    this.setState({
      showLogin: true,
      clickedLogin: 'on',
      clickedRegister: 'off'})
  }

  showRegister() {
    this.setState({
      showLogin: false,
      clickedRegister: 'on',
      clickedLogin: 'off'})
  }

  render() {
    return ( this.state.user ?
      <SaveArticle />
      :
      <div id='app'>
        <div className='main'>
        <p className={this.state.clickedLogin} onClick={this.showLogin}>Login</p>
        <p className={this.state.clickedRegister} onClick={this.showRegister}>Register</p>
        <LoginRegister showLogin={this.state.showLogin} />
        </div>
      </div>
    );
  }
}

export default App;

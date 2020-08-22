import React, { Component } from "react";
import LoginRegister from "./LoginRegister"
import SaveArticle from "./SaveArticle"

class App extends Component {
  constructor() {
    super();
    this.state = {
      showLogin : true
    };
    this.showLogin = this.showLogin.bind(this)
    this.showRegister = this.showRegister.bind(this)
  }

  showLogin() {
    this.setState({showLogin: true})
  }

  showRegister() {
    this.setState({showLogin: false})
  }

  render() {
    return ( localStorage.getItem('user') ?
      <SaveArticle />
      :
      <div>
        <h3 onClick={this.showLogin}>Login</h3>
        <h3 onClick={this.showRegister}>Register</h3>
        <LoginRegister showLogin={this.state.showLogin} />
      </div>
    );
  }
}

export default App;

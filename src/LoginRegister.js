import React, { Component } from 'react';
/*global chrome*/

class LoginRegister extends Component {
  constructor() {
    super()
    this.state = {
      failedAttempt: false
    }
  }

  login(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = chrome.runtime.sendMessage({type: 'login', email, password});
    console.log('RESPONSE FROM LOGIN --->', response)
  }

  register(event) {
    event.preventDefault();
    const email = event.target.email.value
    const password = event.target.password.value
    const response = chrome.runtime.sendMessage({type: 'register', email, password});
    console.log('RESPONSE FROM REGISTER --->', response)
  }

  render() {
    return ( this.props.showLogin ?

      <form onSubmit={this.login} id='login-form'>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' />
        <button type='submit'>Login</button>
      </form> :

      <form id='register-form'>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' />
        <button type='submit'>Register</button>
      </form>
    );
  }
}

export default LoginRegister;

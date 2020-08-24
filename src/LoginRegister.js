import React, { Component } from 'react';
import fire from './secrets.js'
/*global chrome*/

class LoginRegister extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState( { [event.target.name] : event.target.value } )
  }

  login(event) {
    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((err) => console.log('LOGIN ERROR -->', err))
  }

  register(event) {
    event.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((err) => console.log('REGISTER ERROR -->', err))
  }

  render() {
    return ( this.props.showLogin ?

      <form onSubmit={this.login} id='login-form'>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
        <button type='submit'>Login</button>
      </form> :

      <form onSubmit={this.register} id='register-form'>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
        <button type='submit'>Register</button>
      </form>
    );
  }
}

export default LoginRegister;

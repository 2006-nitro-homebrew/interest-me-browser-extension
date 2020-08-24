import React, { Component } from 'react';
import fire from './secrets.js'
import firebase from 'firebase'
/*global chrome*/

class LoginRegister extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      loginFailed: false
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
    .then(() => {
      if (! localStorage.getItem('user')) {
        this.setState({loginFailed: true})
      }
    })
  }

  async register(event) {
    event.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch((err) => console.log('REGISTER ERROR -->', err))
    .then(() => {
    const uid = firebase.auth().currentUser.uid
    firebase.firestore().collection("users").doc(uid).set({
      'email': this.state.email,
      'firstName' : this.state.firstName,
      'lastName' : this.state.lastName})
    })
    .catch((err) => console.log('ADD TO DATABASE ERROR -->', err))
  }

  render() {
    return ( this.props.showLogin ?

      <form onSubmit={this.login} id='login-form'>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
        <button type='submit'>Login</button>
        {this.state.loginFailed ? <p>Login failed, please try again.</p> :  ''}
      </form> :

      <form onSubmit={this.register} id='register-form'>
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' value={this.state.email} onChange={this.handleChange}/>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
        <label htmlFor='firstName'>First Name:</label>
        <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
        <label htmlFor='lastName'>Last Name:</label>
        <input type='text' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
        <button type='submit'>Register</button>
      </form>
    );
  }
}

export default LoginRegister;

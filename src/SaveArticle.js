import React, { Component } from 'react';
import fire from './secrets.js'

class SaveArticle extends Component {

  signOut() {
    fire.auth().signOut().catch((err) => console.log('SIGN OUT -->', err))
  }

  render() {
    return (
      <div id="signed-in">
        <button onClick={this.signOut} type="submit">Sign Out</button>
        <button type="submit">Save This Article!</button>
      </div>
    );
  }
}

export default SaveArticle;

import React, { Component } from 'react';
import fire from './secrets.js'
/* global chrome */

class SaveArticle extends Component {

  signOut() {
    fire.auth().signOut().catch((err) => console.log('SIGN OUT -->', err))
  }

  scrapePage() {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      let url = tabs[0].url;
      alert('THIS IS THE URL ---> ', url)
    });
  }

  render() {
    return (
      <div id="signed-in">
        <button onClick={this.signOut} type="submit">Sign Out</button>
        <button onClick={this.scrapePage} type="submit">Save This Article!</button>
      </div>
    );
  }
}

export default SaveArticle;

import React, { Component } from 'react';
import fire from './secrets.js'
import axios from 'axios'
/* global chrome */

class SaveArticle extends Component {

  signOut() {
    fire.auth().signOut().catch((err) => console.log('SIGN OUT -->', err))
  }

  scrapePage() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          let currTab = tabs[0];
          if (currTab) {
            let url = currTab.url
            axios.post('https://interest-me-web.herokuapp.com/api/users/pull',{url,userId: user.uid},{headers: {'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'}})
            alert('Added Article')
          }
        });
      } else {
        console.log('error on add article')
      }
    })
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

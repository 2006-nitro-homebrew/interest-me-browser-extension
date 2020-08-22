const firebase = require("firebase");
require("firebase/firestore");
import { firebaseConfig } from "../secrets.js";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if ((message.type = "login")) {
    try {
      const login = firebase
        .auth()
        .signInWithEmailAndPassword(message.email, message.password);
      localStorage.setItem("user", JSON.stringify(login.user));
      sendResponse('successful login')
    } catch (error) {
      console.log("ERROR LOGGING IN");
    }
  } else if ((message.type = "register")) {
    try {
      const register = firebase
        .auth()
        .createUserWithEmailAndPassword(message.email, message.password);
      localStorage.setItem("user", JSON.stringify(register.user));
      sendResponse('successful register')
    } catch (error) {
      console.log("ERROR REGISTERING USER");
    }
  } else if (message.type = 'logout') {
    try {
      firebase.auth().signOut();
      localStorage.removeItem("user")
      sendResponse('successful logout')
    } catch (error) {
      console.log('ERROR LOGGING OUT')
    }
  }
});

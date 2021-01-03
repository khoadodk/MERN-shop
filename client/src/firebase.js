import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyASFcFwmUc0Js-UnE0giJy8tOk3Ck3ng30',
  authDomain: 'mern-shop-9554c.firebaseapp.com',
  projectId: 'mern-shop-9554c',
  storageBucket: 'mern-shop-9554c.appspot.com',
  messagingSenderId: '525268419587',
  appId: '1:525268419587:web:003c3bd55a268cda25ba36'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

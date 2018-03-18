// import * as firebase from 'firebase'
import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyABrwQB5ycspfFdmnj1b-ZKpftuUqAblSs',
  authDomain: 'klstore-d65fa.firebaseapp.com',
  databaseURL: 'https://klstore-d65fa.firebaseio.com',
  projectId: 'klstore-d65fa',
  storageBucket: 'klstore-d65fa.appspot.com',
  messagingSenderId: '90357167637'
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp.firestore()

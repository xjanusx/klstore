import * as firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyABrwQB5ycspfFdmnj1b-ZKpftuUqAblSs',
  authDomain: 'klstore-d65fa.firebaseapp.com',
  databaseURL: 'https://klstore-d65fa.firebaseio.com',
  projectId: 'klstore-d65fa',
  storageBucket: 'klstore-d65fa.appspot.com',
  messagingSenderId: '90357167637'
}

firebase.initializeApp(config)

export default {
  db: firebase.database(),
  auth: firebase.auth
}

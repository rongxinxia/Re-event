import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_21mpQ9uHeG5d89HQ_iSwe7qjrWokRXI",
    authDomain: "revents-212318.firebaseapp.com",
    databaseURL: "https://revents-212318.firebaseio.com",
    projectId: "revents-212318",
    storageBucket: "revents-212318.appspot.com",
    messagingSenderId: "616474423796"
  };


  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

  export default firebase;
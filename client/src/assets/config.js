import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD61vd3I0jSI1KBAIRBbCKGJV7WYFMIlK4",
    authDomain: "mobilkerenz88.firebaseapp.com",
    databaseURL: "https://mobilkerenz88.firebaseio.com",
    projectId: "mobilkerenz88",
    storageBucket: "mobilkerenz88.appspot.com",
    messagingSenderId: "692565950032"
};

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp
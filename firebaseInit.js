import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAqrwMX9Iltjx4inksN4EqwMmfphYBcW2E",
  authDomain: "blood-donation-bf735.firebaseapp.com",
  databaseURL: "https://blood-donation-bf735.firebaseio.com",
  projectId: "blood-donation-bf735",
  storageBucket: "blood-donation-bf735.appspot.com",
  messagingSenderId: "479516320978",
  appId: "1:479516320978:web:c5782bc55fe29b5cacf90b",
  measurementId: "G-YSLVT3FCQY",
};

firebase.initializeApp(firebaseConfig);

const fbApp = {
  root: firebase,
  db: firebase.database(),
  auth: firebase.auth(),
  storage: firebase.storage(),
};
export default fbApp;

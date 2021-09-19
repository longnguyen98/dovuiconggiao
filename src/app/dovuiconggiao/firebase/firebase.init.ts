// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDylcYn67X93lxVc7LgoDWJZg069XLVfHE",
  authDomain: "dovuiconggiao.firebaseapp.com",
  projectId: "dovuiconggiao",
  storageBucket: "dovuiconggiao.appspot.com",
  messagingSenderId: "973730171951",
  appId: "1:973730171951:web:59e7400ae980c5786f0ada",
  measurementId: "G-6D198905CP"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export class FirebaseInit {
  app: any;
  analytics: any;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
  }

}

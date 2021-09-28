import {firebase, firebaseui} from "firebaseui-angular";

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email'
      ],
      fullLabel:'Đăng nhập bằng Facebook'
    }
  ],
};
export const firebaseConfig = {
  apiKey: "AIzaSyDylcYn67X93lxVc7LgoDWJZg069XLVfHE",
  authDomain: "dovuiconggiao.firebaseapp.com",
  projectId: "dovuiconggiao",
  storageBucket: "dovuiconggiao.appspot.com",
  messagingSenderId: "973730171951",
  appId: "1:973730171951:web:59e7400ae980c5786f0ada",
  measurementId: "G-6D198905CP"
}

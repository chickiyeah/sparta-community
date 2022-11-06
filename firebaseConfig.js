///import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app';

// 사용할 파이어베이스 서비스 주석을 해제합니다
import "firebase/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
//import "firebase/functions";
import { getStorage } from "firebase/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
   apiKey: "AIzaSyCES-Kjibi7k9dUe5LEGMEvqV-2TeDIblE",
   authDomain: "sparta-myhoneytip-nkw.firebaseapp.com",
   projectId: "sparta-myhoneytip-nkw",
   databaseURL: "https://sparta-myhoneytip-nkw-default-rtdb.firebaseio.com",
   storageBucket: "sparta-myhoneytip-nkw.appspot.com",
   messagingSenderId: "53440918166",
   appId: "1:53440918166:web:5eac77d46dbcc944df08b7",
   measurementId: "G-LZ8LSC550R"
};

export let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

export const db = app.firestore();
export const auth = firebase.auth();
//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
/*if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}*/
export const firebase_db = firebase.database()
const storage = getStorage(app);
/*auth()
  .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  .then(() => {
    console.log('계정을 생성했습니다.');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });*/
export default storage;
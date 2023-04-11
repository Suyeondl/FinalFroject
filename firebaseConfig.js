import firebase from "firebase/compat/app";

//import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyB_h8fvb2J3XFdP6TGlynRsNV_79fxlZvU",
  authDomain: "finalproject-9e9c9.firebaseapp.com",
  projectId: "finalproject-9e9c9",
  storageBucket: "finalproject-9e9c9.appspot.com",
  messagingSenderId: "111093244594",
  appId: "1:111093244594:web:6f138df7685f0f61abdfab"
};

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
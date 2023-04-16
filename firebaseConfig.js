import firebase from "firebase/compat/app";

//import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
//임시 firebase
const firebaseConfig = {
  apiKey: "AIzaSyBb5gReEKJitLYdD-zjiYMtk91f35gmpwc",
  authDomain: "teamproject-4c0d8.firebaseapp.com",
  projectId: "teamproject-4c0d8",
  storageBucket: "teamproject-4c0d8.appspot.com",
  messagingSenderId: "1090193024503",
  appId: "1:1090193024503:web:ae0088fe5d97a251c13af2",
  measurementId: "G-5DEQ9PBBDR"
};

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
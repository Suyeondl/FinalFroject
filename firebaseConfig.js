import firebase from "firebase/compat/app";

//import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
// firebase 연결정보
import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_RBT_gzPy-E1ZSmoCF0bXGnPrOmx8XTw",
  authDomain: "finalproject-878e2.firebaseapp.com",
  projectId: "finalproject-878e2",
  storageBucket: "finalproject-878e2.appspot.com",
  messagingSenderId: "999716342014",
  appId: "1:999716342014:web:327fd3ab7d863456723daf"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
export { db }

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
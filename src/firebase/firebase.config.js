import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCA0KIYTjDrGSL5oJz7XkF4xZhK_cqjYos",
  authDomain: "emajhon-with-firebase.firebaseapp.com",
  projectId: "emajhon-with-firebase",
  storageBucket: "emajhon-with-firebase.appspot.com",
  messagingSenderId: "872103709493",
  appId: "1:872103709493:web:1e7bf10eef12439e279a7c"
};

const app = initializeApp(firebaseConfig);
export default app;
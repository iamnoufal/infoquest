import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const initFirebase = () => {
  // const firebaseApp = initializeApp({
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
  //   measurementId: process.env.REACT_APP_MEASUREMENT_ID
  // });
  const firebaseConfig = {
    apiKey: "AIzaSyAlp2lZm4FNGsIQ9hhUOTqapG9AgCvTbbA",
    authDomain: "infoquest-gct.firebaseapp.com",
    projectId: "infoquest-gct",
    storageBucket: "infoquest-gct.appspot.com",
    messagingSenderId: "602393433348",
    appId: "1:602393433348:web:0628e8a4f53900bc97ec51",
    measurementId: "G-LR11FRCTEB"
  };
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app);
};

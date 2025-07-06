import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { mockAuth } from './mockAuth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "demo-app-id"
};

// For demo purposes - disable Firebase in development
if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_FIREBASE_API_KEY) {
  console.warn('Firebase not configured. Using mock authentication.');
}

let auth, db;

// Always use mock auth in development without real Firebase config
if (!process.env.REACT_APP_FIREBASE_API_KEY || 
    process.env.REACT_APP_FIREBASE_API_KEY === 'demo-api-key' ||
    process.env.REACT_APP_FIREBASE_API_KEY === 'AIzaSyDemo_API_Key_Replace_With_Real_One') {
  console.warn('Using mock authentication - Firebase not configured');
  auth = mockAuth;
  db = null;
} else {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization failed, using mock auth:', error.message);
    auth = mockAuth;
    db = null;
  }
}

export { auth, db };
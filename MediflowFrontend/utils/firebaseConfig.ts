import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'DEIN_API_KEY',
  authDomain: 'DEIN_AUTH_DOMAIN',
  projectId: 'DEIN_PROJECT_ID',
  storageBucket: 'DEIN_STORAGE_BUCKET',
  messagingSenderId: 'DEINE_SENDER_ID',
  appId: 'DEINE_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { defineNuxtPlugin } from '#app';

// Firebase configuration
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    databaseURL: config.public.databaseURL,
    projectId: config.public.projectId,
    storageBucket: config.public.storageBucket,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.appId,
  };

  // Initialize Firebase app
  const firebaseApp = initializeApp(firebaseConfig);

  // Initialize Realtime Database and inject it
  const database: Database = getDatabase(firebaseApp);

  return {
    provide: {
      database,
    },
  };
});

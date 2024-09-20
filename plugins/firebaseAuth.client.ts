// plugins/firebaseAuth.client.ts (make sure it has `.client.ts` so it runs on the client)
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, } from 'firebase/auth';
import { useRuntimeConfig } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;

  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
  };

  // Initialize Firebase only if no other apps have been initialized
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  const auth = getAuth();

  // Set persistence based on your requirements (local, session, or none)
  setPersistence(auth, browserLocalPersistence);

  // Monitor the authentication state and store it globally
  onAuthStateChanged(auth, (user) => {
    nuxtApp.$authUser = user || null;
  });

  // Provide the auth object globally so it can be accessed across the app
  return {
    provide: {
      auth,
    },
  };
});

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          // If no user is authenticated, redirect to login
          return resolve(navigateTo('/admin'));
        }
        resolve();
      });
    });
  }
});
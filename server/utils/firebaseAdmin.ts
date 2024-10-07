import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
import { useRuntimeConfig } from '#imports';

let app;

export function initializeFirebaseAdmin() {
  if (!app) {
    const config = useRuntimeConfig();
    app = initializeApp({
      credential: cert({
        projectId: config.firebaseAdminProjectId,
        privateKey: config.firebaseAdminPrivateKey.replace(/\\n/g, '\n'),  // Replace escaped newlines
        clientEmail: config.firebaseAdminClientEmail,
      }),
      databaseURL: config.firebaseAdminDatabaseUrl,
    });
  }
  return app;
}

export function getFirebaseDatabase() {
  initializeFirebaseAdmin();
  return getDatabase();
}

export function getFirebaseAuth() {
  initializeFirebaseAdmin();
  return getAuth();
}

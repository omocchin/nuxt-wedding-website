// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@vee-validate/nuxt',
  ],
  runtimeConfig: {
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    sendGridEmail: process.env.SENDGRID_EMAIL,
    firebaseAdminProjectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    firebaseAdminPrivateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    firebaseAdminClientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    firebaseAdminDatabaseUrl: process.env.FIREBASE_ADMIN_DATABASE_URL,
    firebaseAuthAllowedEmails: process.env.FIREBASE_AUTH_ALLOWED_EMAILS,
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    }
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
      script: {
        defineModel: true,
        propsDestructure: true
      },
    },
  },
})

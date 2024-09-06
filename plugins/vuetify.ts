import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const primaryTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: 'D8D9CF',
    primary: 'EDEDED',
    secondary: 'FF8787',
    accent: 'E26868',
    accent2: '102C57'
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'primaryTheme',
      themes: {
        primaryTheme
      },
    },
  })
  app.vueApp.use(vuetify)
})

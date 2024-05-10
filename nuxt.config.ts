// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    public: {
      api_key: process.env.API_KEY,
      api_domain: process.env.API_DOMAIN,
    }
  },
  colorMode: {
    preference: 'light'
  },

  modules: ["@nuxt/ui", "nuxt-auth-utils"]
})
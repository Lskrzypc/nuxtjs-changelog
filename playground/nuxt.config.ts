export default defineNuxtConfig({
  modules: ['nuxtjs-changelog'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  changelog: {
    filepath: './changelog.json',
  },
})

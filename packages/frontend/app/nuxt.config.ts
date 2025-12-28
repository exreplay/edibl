import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  experimental: {
    typedPages: true
  },

  typescript: {
    strict: true
  },

  vite: {
    plugins: [tailwindcss()]
  },

  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@primevue/nuxt-module',
    '@edibl/urql',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/image'
  ],

  primevue: {
    options: {
      unstyled: true
    },
    importPT: {
      from: '~/passthrough/config.ts'
    }
  },

  imports: {
    presets: [
      {
        from: '@urql/vue',
        imports: ['urql', 'useQuery', 'useMutation', 'useSubscription']
      }
    ]
  },

  css: [
    'primeicons/primeicons.css',
    './app/assets/css/main.css',
    'vue-swipe-actions/dist/vue-swipe-actions.css'
  ],

  runtimeConfig: {
    public: {
      backendUrl: '',
      graphqlWs: ''
    }
  },

  i18n: {
    locales: [
      { code: 'de', language: 'de-DE' },
      { code: 'en', language: 'en-US' }
    ],
    defaultLocale: 'de'
  },

  compatibilityDate: '2024-07-14'
});

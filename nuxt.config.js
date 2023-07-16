export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - scholar-frontend',
    title: 'scholar-frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/alert.js' },
    { src: '~plugins/helpers' },
    { src: '~plugins/persistedState.client.js', mode: 'client', ssr: false },
    { src: '~plugins/repositories' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: [
      '~/components',
      '~/components/base',
      '~/components/base/inputs',
      '~/components/base/icons',
      '~/components/base/icons/bold',
      '~/components/base/icons/light',
      '~/components/section',
      '~/components/section/layout',
      '~/components/section/layout/footer',
      '~/components/section/store',
      '~/components/section/products',
      '~/components/section/products/navigation',
      '~/components/section/account',
      '~/components/section/info'
    ]
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // https://www.npmjs.com/package/@nuxtjs/moment
    ['@nuxtjs/moment', { defaultLocale: 'id', locales: ['id'] }],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    '@nuxtjs/cloudinary'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Poppins'
      }
    },
    treeShake: true,
    optionsPath: '~plugins/vuetify.js'
  },

  // https://www.npmjs.com/package/nuxt-webfontloader
  webfontloader: {
    google: {
      families: ['Poppins:400,500,600,700', 'Lato:400,700']
    }
  },

  cloudinary: {
    cloudName: process.env.CLOUDNAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    secure: false
  },

  // https://www.npmjs.com/package/@nuxtjs/style-resources
  styleResources: {
    stylus: ['./assets/styles/*.styl']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}

import colors from 'vuetify/es5/util/colors'

export default {
  theme: {
    options: { customProperties: true },
    dark: false,
    themes: {
      light: {
        primary: '#FFF',
        accent: '#FFF',
        secondary: '#3C91E6',
        info: '#00A1E4',
        warning: '#F5B700',
        error: '#DD403A',
        success: '#00CC66'
      },
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  }
}

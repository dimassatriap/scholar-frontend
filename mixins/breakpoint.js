export default {
  data() {
    return {
      isHydrated: false
    }
  },

  computed: {
    isXs() {
      return this.isHydrated ? this.$vuetify.breakpoint.xs : false
    },

    isSmAndDown() {
      return this.isHydrated ? this.$vuetify.breakpoint.smAndDown : false
    },

    isSmAndUp() {
      return this.isHydrated ? this.$vuetify.breakpoint.smAndUp : false
    },

    isMdAndUp() {
      return this.isHydrated ? this.$vuetify.breakpoint.mdAndUp : false
    }
  },

  mounted() {
    this.isHydrated = true
  }
}

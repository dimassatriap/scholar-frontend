export default {
  data() {
    return {
      scholar: {
        id: null,
        name: null,
        phone: null,
        address: null,
        gender: null,
        birthDate: null,
        accountId: null
      },
      account: {
        id: null,
        username: null,
        email: null
      }
    }
  },

  computed: {
    isLogin() {
      return !!this.account.id && !!this.scholar.id
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'scholar/SET_SCHOLAR') {
        this.scholar = state.scholar.scholarData
      }

      if (mutation.type === 'scholar/CLEAR_SCHOLAR') {
        this.scholar = state.scholar.scholarData
      }

      if (mutation.type === 'auth/SET_ACCOUNT') {
        this.account = state.auth.account
      }

      if (mutation.type === 'auth/CLEAR_ACCOUNT') {
        this.account = state.auth.account
      }
    })
  },

  mounted() {
    this.scholar = this.$store.getters['scholar/getScholarData']
    this.account = this.$store.getters['auth/getAccount']

    // console.log('this.scholar: ', this.scholar)
    // console.log('this.account: ', this.account)
  }
}

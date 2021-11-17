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

  mounted() {
    this.scholar = this.$store.getters['scholar/getScholarData']
    this.account = this.$store.getters['auth/getAccount']

    // console.log('this.scholar: ', this.scholar)
    // console.log('this.account: ', this.account)
  }
}

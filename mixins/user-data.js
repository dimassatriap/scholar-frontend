export default {
  data() {
    return {
      user: {
        idMember: null,
        status: null,
        msisdn: null,
        address: {},
        avatar: {},
        cover: {},
        userAccount: {},
        userProfile: {},
        walletBalance: [{}]
      },
      userNav: [
        {
          label: 'Pesanan',
          icon: '$Document',
          to: '/user/pesanan',
          child: [
            { label: 'Belum Dibayar', to: '/user/pesanan?status=ORDERED' },
            { label: 'Semua Pesanan', to: '/user/pesanan' }
          ]
        },
        { label: 'Favorit', icon: '$Heart2', to: '/user/wishlist' },
        // { label: 'Ulasan', icon: '$Chat', to: '/user/reviews/semua' },
        // { label: 'Voucher', icon: '$Voucher', to: '/user/voucher-list' },
        {
          label: 'Akun',
          icon: '$Profile',
          to: '/user/akun',
          child: [
            { label: 'Profil', to: '/user/akun/profile' },
            { label: 'Alamat', to: '/user/akun/alamat' },
            { label: 'Rekening Bank', to: '/user/akun/bank' }
          ]
        }
      ],

      userNavMobile: [
        {
          label: 'Pesanan',
          icon: '$Document',
          to: '/user/pesanan'
        },
        // { label: 'Ulasan', icon: '$Chat', to: '/user/reviews' },
        // { label: 'Voucher', icon: '$Voucher', to: '/user/voucher-list' },
        { label: 'Wallet', icon: '$Wallet', to: '/user/wallet' },
        {
          label: 'Akun',
          icon: '$Profile',
          to: '/user/akun'
        }
      ],

      userProfileInfo: [
        {
          label: 'Tanggal Lahir',
          value: (user) => {
            return this.$moment(user.userProfile.birthDate).format('DD MMM YYYY')
          }
        },
        {
          label: 'Jenis kelamin',
          value: (user) => {
            return this.$helpers.genderParse(user.userProfile.gender)
          }
        },
        {
          label: 'Email',
          value: (user) => {
            return user.userAccount.email
          }
        },
        {
          label: 'No.Handphone / Whatsapp',
          value: (user) => {
            return user.msisdn
          }
        }
      ]
    }
  },

  computed: {
    getNameFirst() {
      let name = ''

      if (this.user.userProfile.nameFirst) {
        const temp = this.user.userProfile.nameFirst.split(' ')
        name = temp[0]
      }

      return name
    },

    getFullName() {
      let fullName = ''
      const firstName = this.user.userProfile.nameFirst || ''
      const lastName = this.user.userProfile.nameLast || ''

      fullName = firstName + ' ' + lastName
      return fullName
    },

    getUserWalletBalanceAmount() {
      return this.user.walletBalance[0].amount
    },

    getWalletBalance() {
      return this.$helpers.formatPrice(
        this.getUserWalletBalanceAmount,
        this.user.walletBalance[0].currency ? this.user.walletBalance[0].currency.symbol : null
      )
    },

    isWalletRouteActive() {
      const routeArray = this.$route.name.split('-')
      return routeArray[2] === 'wallet'
    }
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'member/SET_MEMBER') {
        this.user = state.member.memberData
      }

      if (mutation.type === 'member/CLEAR_MEMBER') {
        this.user = state.member.memberData
      }
    })
  },

  mounted() {
    this.user = this.$store.getters['member/getMemberData']
    // console.log('this.user: ', this.user)
  },

  methods: {
    checkIsNavActive(route) {
      return this.$route.path.includes(route)
    },

    checkIsNavChildActive(route) {
      const array = route.split('?')
      const path = array[0]
      const query = array[1]
      const isEmptyQuery = this.$helpers.isEmptyObject(this.$route.query)
      if (query && isEmptyQuery) {
        return false
      } else if (!query && !isEmptyQuery) {
        return false
      } else if (query && !isEmptyQuery) {
        const arrayOfQuery = query.split('=')
        return this.$route.query[arrayOfQuery[0]] === arrayOfQuery[1] && this.$route.path.includes(path)
      } else {
        return this.$route.path.includes(path)
      }
    },

    async logout() {
      try {
        const a = await this.$repo.auth.getLogout()
        const res = a.data.response
        if (res && res.status) {
        }
      } catch (error) {
        // console.log('error: ', error)
      } finally {
        this.$store.dispatch('auth/logout')
      }
    }
  }
}

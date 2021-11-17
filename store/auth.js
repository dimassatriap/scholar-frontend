export const state = () => ({
  token: null,
  account: {
    id: null,
    username: null,
    email: null
  }
})

export const getters = {
  getAuthData(state) {
    return state
  },

  getAccount(state) {
    return state.account
  },

  getToken(state) {
    return state.token
  }
}

export const mutations = {
  SET_ACCOUNT(state, payload) {
    state.account = payload.account
    state.token = payload.token
  },

  CLEAR_ACCOUNT(state) {
    state.token = null
    state.account = {
      id: null,
      username: null,
      email: null
    }
  }
}

export const actions = {
  saveAccount(vuexContext, payload) {
    vuexContext.commit('SET_ACCOUNT', payload)
    // this.$axios.onRequest((config) => {
    //   config.headers.common.authorization = 'Bearer ' + payload.token
    // })
  },

  logout(vuexContext) {
    vuexContext.commit('CLEAR_ACCOUNT')
    vuexContext.commit('scholar/CLEAR_SCHOLAR', null, { root: true })
    this.$router.push('/login')
  }
}

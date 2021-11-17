export const state = () => ({
  scholarData: {
    id: null,
    name: null,
    phone: null,
    address: null,
    gender: null,
    birthDate: null,
    accountId: null
  }
})

export const getters = {
  getScholarData(state) {
    return state.scholarData
  }
}

export const mutations = {
  SET_SCHOLAR(state, payload) {
    state.scholarData = payload
  },

  CLEAR_SCHOLAR(state) {
    const scholarData = {
      id: null,
      name: null,
      phone: null,
      address: null,
      gender: null,
      birthDate: null,
      accountId: null
    }
    state.scholarData = scholarData
  }
}

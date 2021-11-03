export const state = () => ({
  scholarData: {
    id: null,
    name: null,
    phone: null,
    address: null,
    gender: null
  }
})

export const getters = {
  getScholarData(state) {
    return state.scholarData
  }
}

export const mutations = {
  SET_MEMBER(state, payload) {
    state.scholarData = payload
  },

  CLEAR_MEMBER(state) {
    const scholarData = {
      id: null,
      name: null,
      phone: null,
      address: null,
      gender: null
    }
    state.scholarData = scholarData
  }
}

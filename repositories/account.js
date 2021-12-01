const endpoint = 'account/'

export default ($axios) => ({
  getAccounts(payload) {
    return $axios.get(endpoint, { params: payload })
  },

  updateAccount(id, payload) {
    return $axios.put(endpoint + id, payload)
  },

  deleteAccount(id, payload) {
    return $axios.delete(endpoint + id, payload)
  }
})

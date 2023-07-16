const endpoint = '/auth/'

export default ($axios) => ({
  getAuthMe() {
    return $axios.get(endpoint + 'me')
  },

  login(payload) {
    return $axios.post(endpoint + 'login', payload)
  },

  register(payload) {
    return $axios.post(endpoint + 'register', payload)
  },

  getHelpdesk(payload) {
    return $axios.get('helpdesk', payload)
  },

  postHelpdesk(payload) {
    return $axios.post('helpdesk', payload)
  }
})

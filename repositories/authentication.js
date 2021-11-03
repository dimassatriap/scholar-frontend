const endpoint = '/auth/'

export default ($axios) => ({
  getAuthMe() {
    return $axios.get(endpoint + 'me')
  },

  login(payload) {
    return $axios.post('auth/login', payload)
  },

  register(payload) {
    return $axios.post('auth/register', payload)
  }
})

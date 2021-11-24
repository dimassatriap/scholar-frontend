const endpoint = 'scholar/'

export default ($axios) => ({
  create(payload) {
    return $axios.post(endpoint, payload)
  },

  getScholarById(id) {
    return $axios.get(endpoint + id)
  },

  updateScholar(id, payload) {
    return $axios.put(endpoint + id, payload)
  }
})

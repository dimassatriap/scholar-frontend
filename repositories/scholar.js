const endpoint = 'scholar/'

export default ($axios) => ({
  create(payload) {
    return $axios.post(endpoint, payload)
  },

  getScholars(payload) {
    return $axios.get('scholar', { params: payload })
  },

  getScholarById(id) {
    return $axios.get(endpoint + id)
  },

  updateScholar(id, payload) {
    return $axios.put(endpoint + id, payload)
  },

  delete(id, payload) {
    return $axios.delete(endpoint + id, payload)
  }
})

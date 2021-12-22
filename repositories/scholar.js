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
  },

  // Publications
  createPublication(payload) {
    return $axios.post('/publication', payload)
  },

  getScholarByIdWithPublication(id) {
    return $axios.get(endpoint + id + '/publication')
  },

  updatePublication(id, payload) {
    return $axios.put('/publication/' + id, payload)
  },

  deletePublication(id, payload) {
    return $axios.delete('/publication/' + id, payload)
  }
})

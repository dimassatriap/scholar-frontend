const endpoint = 'publication/'

export default ($axios) => ({
  create(payload) {
    return $axios.post(endpoint, payload)
  },

  getPublications(payload) {
    return $axios.get('publication', { params: payload })
  },

  getPublicationById(id) {
    return $axios.get(endpoint + id)
  },

  update(id, payload) {
    return $axios.put(endpoint + id, payload)
  },

  delete(id, payload) {
    return $axios.delete(endpoint + id, payload)
  },

  getKeywords(payload) {
    return $axios.get('keyword', { params: payload })
  }
})

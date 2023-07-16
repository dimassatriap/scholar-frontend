export default ($axios) => ({
  getUniversities(payload) {
    return $axios.get('university', { params: payload })
  },

  createUniversity(payload) {
    return $axios.post('university', payload)
  },

  updateUniversity(id, payload) {
    return $axios.put('university/' + id, payload)
  },

  deleteUniversity(id, payload) {
    return $axios.delete('university/' + id, payload)
  },

  getFaculties(payload) {
    return $axios.get('faculty', { params: payload })
  },

  createFaculty(payload) {
    return $axios.post('faculty', payload)
  },

  updateFaculty(id, payload) {
    return $axios.put('faculty/' + id, payload)
  },

  deleteFaculty(id, payload) {
    return $axios.delete('faculty/' + id, payload)
  },

  getDepartments(payload) {
    return $axios.get('department', { params: payload })
  },

  createDepartment(payload) {
    return $axios.post('department', payload)
  },

  updateDepartment(id, payload) {
    return $axios.put('department/' + id, payload)
  },

  deleteDepartment(id, payload) {
    return $axios.delete('department/' + id, payload)
  }
})

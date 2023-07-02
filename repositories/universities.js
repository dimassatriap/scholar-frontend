export default ($axios) => ({
  getAllDepartments(payload) {
    return $axios.get('department', { params: payload })
  }
})

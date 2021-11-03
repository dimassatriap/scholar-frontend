import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'yb5-yubirpo-state'
  })(store)
}

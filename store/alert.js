export const state = () => ({
  content: '',
  color: '',
  timeout: '',
  onOk: '',
  actionText: 'OK'
})

export const mutations = {
  showMessage(state, payload) {
    state.content = payload.content
    state.color = payload.color
    state.timeout = payload.timeout
    state.actionText = payload.actionText
    state.onOk = payload.onOk
  },

  closeAll() {},

  cartChanged() {}
}

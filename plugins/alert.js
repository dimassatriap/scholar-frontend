export default ({ store }, inject) => {
  inject('YAlert', {
    show({
      content = '',
      color = 'rgba(19, 21, 21, 0.9)',
      timeout = '-1',
      actionText = 'OK',
      onOk = () => {
        this.closeAll()
      }
    }) {
      store.commit('alert/showMessage', { content, color, timeout, actionText, onOk })
    },

    closeAll() {
      store.commit('alert/closeAll')
    }
  })
}

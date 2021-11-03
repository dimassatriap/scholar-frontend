import authentication from './authentication'

export default ($axios) => ({
  auth: authentication($axios)
})

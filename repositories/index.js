import authentication from './authentication'
import scholar from './scholar'

export default ($axios) => ({
  auth: authentication($axios),
  scholar: scholar($axios)
})

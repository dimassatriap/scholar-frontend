import authentication from './authentication'
import account from './account'

export default ($axios) => ({
  auth: authentication($axios),
  account: account($axios)
})

import authentication from './authentication'
import scholar from './scholar'
import account from './account'
import publication from './publication'

export default ($axios) => ({
  auth: authentication($axios),
  scholar: scholar($axios),
  account: account($axios),
  publication: publication($axios)
})

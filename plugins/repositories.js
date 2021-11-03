import createRepositories from '~/repositories'

export default (context, inject) => {
  inject('repo', createRepositories(context.$axios))
}

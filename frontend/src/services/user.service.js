import createApiClient from './api.service'

class UserService {
  constructor() {
    this.api = createApiClient('/api/users')
  }

  getByEmail(email) {
    return this.api.get('/', { params: { email } })
  }
  getById(id) {
    return this.api.get(`/${id}`)
  }
  signUp(data) {
    return this.api.post('/', data)
  }
  signIn(data) {
    return this.api.post('/signin', data)
  }
  signOut() {
    return this.api.post('/signout')
  }
}

export default new UserService()

import createApiClient from './api.service'

class UserService {
  constructor() {
    this.api = createApiClient('/api')
  }

  getByEmail(email) {
    return this.api.get('/user', { params: { email } })
  }
  getById(id) {
    return this.api.get(`/user/${id}`)
  }
  signUp(data) {
    return this.api.post('/user', data)
  }
  signIn(data) {
    return this.api.post('/signin', data)
  }
  signOut() {
    return this.api.post('/signout')
  }
}

export default new UserService()

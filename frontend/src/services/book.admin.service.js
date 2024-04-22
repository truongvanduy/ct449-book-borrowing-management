import createApiClient from './api.service'

class BookAdminService {
  constructor(baseUrl = '/api/admin/books') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    return (await this.api.get('/')).data
  }

  async create() {
    return (await this.api.get('/create')).data
  }
  async store(data) {
    return (
      await this.api.post('/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    ).data
  }
}

export default new BookAdminService()

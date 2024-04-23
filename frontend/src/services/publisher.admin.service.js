import createApiClient from './api.service'

class PublisherAdminService {
  constructor(baseUrl = '/api/admin/publishers') {
    this.api = createApiClient(baseUrl)
  }

  async getAll(filter) {
    return (
      await this.api.get('/', {
        params: filter
      })
    ).data
  }

  async get(id) {
    return (await this.api.get(`/${id}/edit`)).data
  }

  async create() {
    return (await this.api.get('/create')).data
  }
  async store(data) {
    return (await this.api.post('/create', data, {})).data
  }
  async update(data) {
    return (await this.api.patch('/${id}/edit', data, {})).data
  }

  async delete(id) {
    return (await this.api.delete(`/${id}/delete`)).data
  }
}

export default new PublisherAdminService()

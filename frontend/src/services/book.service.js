import createApiClient from './api.service'

class BookService {
  constructor(baseUrl = '/api/books') {
    this.api = createApiClient(baseUrl)
  }

  async getAll(filter) {
    return (await this.api.get('', { params: filter })).data
  }

  async create(data) {
    return (await this.api.post('/', data)).data
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data
  }
}

export default new BookService()

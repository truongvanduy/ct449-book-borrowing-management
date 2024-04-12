import createApiClient from './api.service'

class BookService {
  constructor(baseUrl = '/api/borrowings') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    return (await this.api.get('/')).data
  }

  async get(bookId) {
    return (await this.api.get(`/${bookId}`)).data
  }

  async create(bookId) {
    return (
      await this.api.post('/', {
        bookId: bookId
      })
    ).data
  }

  async register(bookId) {
    return (
      await this.api.patch('/', {
        bookId: bookId
      })
    ).data
  }
}

export default new BookService()

import createApiClient from './api.service'

class BookService {
  constructor(baseUrl = '/api/admin/borrowings') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    return (await this.api.get('/')).data
  }

  async approve(id) {
    return (
      await this.api.patch('/approve', {
        borrowingId: id
      })
    ).data
  }
  async reject(id) {
    return (
      await this.api.patch('/reject', {
        borrowingId: id
      })
    ).data
  }
}

export default new BookService()

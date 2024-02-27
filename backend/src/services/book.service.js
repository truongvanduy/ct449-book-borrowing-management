const { name } = require('../../app');

class BookService {
  constructor(client) {
    this.Book = client.db().collection('books');
  }

  async find(filter) {
    const cursor = await this.Book.find(filter);
    return await cursor.toArray();
  }

  async findByTitle(title) {
    return await this.find({
      title: { $regex: new RegExp(title) },
      $options: 'i',
    });
  }
}

module.exports = BookService;

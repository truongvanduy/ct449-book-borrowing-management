const { name } = require('../../app');

class AuthorService {
  constructor(client) {
    this.Author = client.db().collection('authors');
  }

  async find(filter) {
    const cursor = await this.Author.find(filter);
    return await cursor.toArray();
  }

  async findByTitle(name) {
    return await this.find({
      name: { $regex: new RegExp(name) },
      $options: 'i',
    });
  }
}

module.exports = AuthorService;

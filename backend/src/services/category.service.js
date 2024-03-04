const { name } = require('../../app');

class CategoryService {
  constructor(client) {
    this.Category = client.db().collection('categories');
  }

  async find(filter) {
    const cursor = await this.Category.find(filter);
    return await cursor.toArray();
  }

  async findByTitle(name) {
    return await this.find({
      name: { $regex: new RegExp(name) },
      $options: 'i',
    });
  }
}

module.exports = CategoryService;

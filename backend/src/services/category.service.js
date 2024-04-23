class CategoryService {
  constructor(client) {
    this.Category = client.db().collection('categories');
  }

  async findAll(filter) {
    return (await this.Category.find(filter)).toArray();
  }

  async findOne(filter) {
    return await this.Category.findOne(filter);
  }

  async create(data) {
    const { insertedId } = await this.Category.insertOne(data);

    const result = await this.Category.findOne({ _id: insertedId });
    return result;
  }

  async update(query, data) {
    return await this.Category.updateOne(query, { $set: data });
  }
}

module.exports = CategoryService;

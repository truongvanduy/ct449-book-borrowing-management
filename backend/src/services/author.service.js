class AuthorService {
  constructor(client) {
    this.Author = client.db().collection('authors');
  }

  async findAll(filter) {
    return (await this.Author.find(filter)).toArray();
  }

  async findOne(filter) {
    return await this.Author.findOne(filter);
  }

  async create(data) {
    const { insertedId } = await this.Author.insertOne(data);

    const result = await this.Author.findOne({ _id: insertedId });
    return result;
  }

  async update(query, data) {
    return await this.Author.updateOne(query, { $set: data });
  }
}

module.exports = AuthorService;

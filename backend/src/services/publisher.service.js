class PublisherService {
  constructor(client) {
    this.Publisher = client.db().collection('publishers');
  }

  async findAll(filter) {
    return (await this.Publisher.find(filter)).toArray();
  }

  async findOne(filter) {
    return await this.Publisher.findOne(filter);
  }

  async create(data) {
    const { insertedId } = await this.Publisher.insertOne(data);

    const result = await this.Publisher.findOne({ _id: insertedId });
    return result;
  }

  async update(query, data) {
    return await this.Publisher.updateOne(query, { $set: data });
  }
}

module.exports = PublisherService;

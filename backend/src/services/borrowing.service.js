class BorrowingService {
  constructor(client) {
    this.Borrowing = client.db().collection('borrowings');
  }

  async findAll(filter) {
    return (await this.Borrowing.find(filter)).toArray();
  }

  async findOne(filter) {
    return await this.Borrowing.findOne(filter);
  }

  async create(data) {
    const { insertedId } = await this.Borrowing.insertOne(data);

    const result = await this.Borrowing.findOne({ _id: insertedId });
    return result;
  }

  async update(query, data) {
    return await this.Borrowing.updateOne(query, { $set: data });
  }
}

module.exports = BorrowingService;

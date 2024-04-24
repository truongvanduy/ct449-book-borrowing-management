class BorrowingService {
  constructor(client) {
    this.Borrowing = client.db().collection('borrowings');
  }

  async findAll(filter) {
    // return (await this.Borrowing.find(filter)).toArray();
    return await this.Borrowing.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $unwind: '$book',
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $sort: { registered_at: -1 },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          bookId: 1,
          registered_at: 1,
          pickup_at: 1,
          return_at: 1,
          status: 1,
          'book.title': 1,
          'book.imageSource': 1,
          'user.email': 1,
        },
      },
    ]).toArray();
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

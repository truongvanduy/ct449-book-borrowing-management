const { name } = require('../../app');

class BookService {
  constructor(client) {
    this.Book = client.db().collection('books');
  }

  async getBookCards(filter = {}) {
    return await this.Book.aggregate([
      { $match: filter },
      {
        $unwind: '$authorIds',
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'authorIds',
          foreignField: '_id',
          as: 'authorDocs',
        },
      },
      { $unwind: '$authorDocs' },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          imageLinks: { $first: '$imageLinks' },
          authorsName: { $push: '$authorDocs.name' },
        },
      },
      {
        $addFields: {
          authorsName: {
            $reduce: {
              input: '$authorsName',
              initialValue: '',
              in: {
                $cond: [
                  { $eq: ['$$value', ''] },
                  '$$this',
                  { $concat: ['$$value', ', ', '$$this'] },
                ],
              },
            },
          },
        },
      },
    ]).toArray();
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

const { name } = require('../../app');

class BookService {
  #detailGroupFields = {
    description: { $first: '$description' },
    pageCount: { $first: '$pageCount' },
    publisher: { $addToSet: '$publisherDocs.name' },
    publishedDate: { $first: '$publishedDate' },
    language: { $first: '$language' },
    quantity: { $first: '$quantity' },
    borrowed: { $first: '$borrowed' },
  };

  constructor(client) {
    this.Book = client.db().collection('books');
  }

  #transformPipeline(detail = false) {
    const groupFields = {
      _id: '$_id',
      title: { $first: '$title' },
      imageSource: { $first: '$imageSource' },
      authors: { $addToSet: '$authorDocs.name' },
      categories: { $addToSet: '$categoryDocs.name' },
      quantity: { $first: '$quantity' },
    };

    if (detail) {
      Object.assign(groupFields, this.#detailGroupFields);
    }

    return [
      {
        $lookup: {
          from: 'authors',
          localField: 'authorIds',
          foreignField: '_id',
          as: 'authorDocs',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryIds',
          foreignField: '_id',
          as: 'categoryDocs',
        },
      },
      {
        $lookup: {
          from: 'publishers',
          localField: 'publisherId',
          foreignField: '_id',
          as: 'publisherDocs',
        },
      },
      { $unwind: '$authorDocs' },
      { $unwind: '$categoryDocs' },
      { $unwind: '$publisherDocs' },
      {
        $group: groupFields,
      },
      {
        $addFields: {
          authors: {
            $reduce: {
              input: '$authors',
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
          categories: {
            $reduce: {
              input: '$categories',
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
          publisher: {
            $reduce: {
              input: '$publisher',
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
    ];
  }

  async find(filter = {}) {
    return await this.Book.aggregate([
      { $match: filter },
      ...this.#transformPipeline(),
    ]).toArray();
  }

  async findOne(id) {
    return await this.Book.aggregate([
      { $match: { _id: id } },
      ...this.#transformPipeline(true),
    ]).toArray();
  }

  async findByTitle(title) {
    return await this.find({
      title: { $regex: new RegExp(title) },
      $options: 'i',
    });
  }

  async create(data) {
    const { insertedId } = await this.Book.insertOne(data);
    return insertedId;
  }

  async upsert(query, data) {
    return await this.Book.updateOne(query, { $set: data }, { upsert: true });
  }

  async deleteOne(query) {
    return await this.Book.deleteOne(query);
  }
}

module.exports = BookService;

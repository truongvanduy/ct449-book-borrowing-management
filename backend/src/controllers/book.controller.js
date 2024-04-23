const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');
const AuthorService = require('../services/author.service');
const BookService = require('../services/book.service');
const CategoryService = require('../services/category.service');
const PublisherService = require('../services/publisher.service');
const MongoDB = require('../utils/mongodb.util');
const idUtil = require('../utils/id.util');

const bookController = {
  findOne: async (req, res, next) => {
    let id = req.params.id;
    if (!id) {
      return next(new ApiError(400, 'Invalid book ID'));
    }
    id = idUtil(id);
    const bookService = new BookService(MongoDB.client);
    try {
      const [document] = await bookService.findOne(id);

      if (!document) {
        return next(new ApiError(404, 'Book not found'));
      }
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving book card: ' + error
        )
      );
    }
  },
  findAll: async (req, res, next) => {
    let documents = [];
    const { q } = req.query;

    // Filter all books with title matching the search query
    const filter = (q && { title: new RegExp(`.*${q}.*`, 'i') }) || {};

    try {
      const bookService = new BookService(MongoDB.client);
      documents = await bookService.find(filter);
      return res.json(documents);
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving book cards. ' + error
        )
      );
    }
  },
  create: async (req, res, next) => {
    try {
      // Get authors
      const authorService = new AuthorService(MongoDB.client);
      const authors = await authorService.findAll({});
      if (!authors) {
        return next(new ApiError(404, 'Authors not found'));
      }

      // Get publishers
      const publisherService = new PublisherService(MongoDB.client);
      const publishers = await publisherService.findAll({});
      if (!publishers) {
        return next(new ApiError(404, 'Publishers not found'));
      }

      // Get categories
      const categoryService = new CategoryService(MongoDB.client);
      const categories = await categoryService.findAll({});
      if (!categories) {
        return next(new ApiError(404, 'Categories not found'));
      }

      return res.send({ authors, publishers, categories });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
  store: async (req, res, next) => {
    const bookService = new BookService(MongoDB.client);
    const data = req.body;
    const file = req.files[0];
    console.log(data);
    if (!data || !file) {
      return next(new ApiError(400, 'Invalid data'));
    }
    console.log(file);
    // Validate data
    if (
      !data?.title ||
      !data?.author ||
      !data?.publisher ||
      !data?.category ||
      !data?.quantity ||
      !file
    ) {
      return next(new ApiError(400, 'Invalid data values'));
    }
    console.log(file);

    // Filter data
    const filteredData = {
      title: data.title,
      authorIds: [parseInt(data.author)],
      publisherId: parseInt(data.publisher),
      categoryIds: [parseInt(data.category)],
      quantity: parseInt(data.quantity) >= 0 ? parseInt(data.quantity) : 0,
      publishedDate: data.publishedDate || '',
      description: data.description || '',
      imageSource: `/images/covers/${file.filename}`,
    };

    try {
      const bookService = new BookService(MongoDB.client);
      const insertedId = await bookService.create(filteredData);
      if (!insertedId) {
        return next(new ApiError(500, 'An error occurred while creating book'));
      }
      res.send({ message: 'Thêm sách thành công' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
  update: async (req, res, next) => {
    const bookService = new BookService(MongoDB.client);
    const data = req.body;
    console.log(data);
    if (!data) {
      return next(new ApiError(400, 'Invalid data'));
    }
    // Validate data
    if (
      !data?._id ||
      !data?.title ||
      !data?.author ||
      !data?.publisher ||
      !data?.category ||
      !data?.quantity
    ) {
      return next(new ApiError(400, 'Invalid data values'));
    }

    // Filter data
    const _id = idUtil(data._id);
    const filteredData = {
      title: data.title,
      authorIds: [parseInt(data.author)],
      publisherId: parseInt(data.publisher),
      categoryIds: [parseInt(data.category)],
      quantity: parseInt(data.quantity) >= 0 ? parseInt(data.quantity) : 0,
      publishedDate: data.publishedDate || '',
      description: data.description || '',
      language: data.language || '',
    };

    let file = null;
    if (req?.files && req.files.length > 0) {
      file = req.files[0];
      filteredData.imageSource = `/images/covers/${file.filename}`;
    }

    try {
      const response = await bookService.upsert({ _id }, filteredData);
      if (!response) {
        return next(new ApiError(500, 'An error occurred while creating book'));
      }
      res.send({ message: 'Cập nhật sách thành công' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
  destroy: async (req, res, next) => {
    try {
      let { id } = req.params;
      console.log(id);
      id = idUtil(id);
      const bookService = new BookService(MongoDB.client);
      const response = await bookService.deleteOne({ _id: id });
      if (!response) {
        return next(new ApiError(500, 'An error occurred while deleting book'));
      }
      res.send({ message: 'Xóa sách thành công' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
};

module.exports = bookController;

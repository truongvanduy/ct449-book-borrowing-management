const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');
const AuthorService = require('../services/author.service');
const PublisherService = require('../services/publisher.service');
const CategoryService = require('../services/category.service');
const MongoDB = require('../utils/mongodb.util');
const idUtil = require('../utils/id.util');
const { index } = require('./borrowing.controller');

const publisherController = {
  findOne: async (req, res, next) => {
    let id = req.params.id;
    if (!id) {
      return next(new ApiError(400, 'Invalid publisher ID'));
    }
    id = idUtil(id);
    const publisherService = new PublisherService(MongoDB.client);
    try {
      const [document] = await publisherService.findOne(id);

      if (!document) {
        return next(new ApiError(404, 'Publisher not found'));
      }
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving publisher card: ' + error
        )
      );
    }
  },
  index: async (req, res, next) => {
    let documents = [];
    const { q } = req.query;

    // Filter all publishers with title matching the search query
    const filter = (q && { name: new RegExp(`.*${q}.*`, 'i') }) || {};

    try {
      const publisherService = new PublisherService(MongoDB.client);
      documents = await publisherService.findAll(filter);
      return res.json(documents);
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving publisher cards. ' + error
        )
      );
    }
  },
  create: async (req, res, next) => {
    return res.send({ status: 'ok' });
  },
  store: async (req, res, next) => {
    const data = req?.body;
    if (!data) {
      return next(new ApiError(400, 'Invalid data'));
    }
    if (!data?.name) {
      return next(new ApiError(400, 'Invalid data values'));
    }

    // Filter data
    const filteredData = {
      name: data.name,
      address: data?.address || '',
    };

    try {
      const publisherService = new PublisherService(MongoDB.client);
      const insertedId = await publisherService.create(filteredData);
      if (!insertedId) {
        return next(
          new ApiError(500, 'An error occurred while creating publisher')
        );
      }
      res.send({ message: 'Thêm NXB thành công' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
  edit: async (req, res, next) => {
    let { id } = req.params;
    if (id.length !== 24) {
      id = parseInt(id);
    }
    if (!id) {
      return next(new ApiError(400, 'Invalid publisher ID'));
    }

    const publisherService = new PublisherService(MongoDB.client);
    try {
      const document = await publisherService.findOne({ _id: idUtil(id) });
      if (!document) {
        return next(new ApiError(404, 'Publisher not found'));
      }
      return res.send({ publisher: document });
    } catch (error) {
      return next(
        new ApiError(
          500,
          'An error occurred while retrieving publisher card: ' + error
        )
      );
    }
  },
  update: async (req, res, next) => {
    const data = req?.body;
    let _id = data?._id;
    if (_id.length !== 24) {
      _id = parseInt(_id);
    }
    if (!data) {
      return next(new ApiError(400, 'Invalid data'));
    }
    if (!data?.name) {
      return next(new ApiError(400, 'Invalid data values'));
    }

    // Filter data
    const filteredData = {
      name: data.name,
      address: data?.address || '',
    };

    try {
      const publisherService = new PublisherService(MongoDB.client);
      const insertedId = await publisherService.update(
        { _id: idUtil(_id) },
        filteredData
      );
      if (!insertedId) {
        return next(
          new ApiError(500, 'An error occurred while creating publisher')
        );
      }
      res.send({ message: 'Cập nhật NXB thành công' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
  destroy: async (req, res, next) => {
    try {
      let { id: _id } = req.params;
      if (_id.length !== 24) {
        _id = parseInt(_id);
      }
      _id = idUtil(_id);
      const publisherService = new PublisherService(MongoDB.client);
      const response = await publisherService.deleteOne({ _id: _id });
      if (!response) {
        return next(
          new ApiError(500, 'An error occurred while deleting publisher')
        );
      }
      res.send({ message: 'Xóa NXB thành công' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
};

module.exports = publisherController;

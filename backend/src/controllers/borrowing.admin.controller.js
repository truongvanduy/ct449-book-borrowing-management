const { ObjectId } = require('mongodb');
const ApiError = require('../api-error');
const BorrowingService = require('../services/borrowing.service');
const MongoDB = require('../utils/mongodb.util');

const borrowingAdminController = {
  index: async (req, res, next) => {
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const borrowings = await borrowingService.findAll({
        status: { $ne: 'initialized' },
      });
      if (!borrowings) {
        return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
      }
      return res.send(borrowings);
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },

  approve: async (req, res, next) => {
    const { borrowingId } = req.body;
    if (!borrowingId) {
      return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
    }
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const borrowing = await borrowingService.findOne({
        _id: new ObjectId(borrowingId),
      });

      if (!borrowing) {
        return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
      }
      if (!(borrowing.status === 'registered')) {
        return next(new ApiError(400, 'Không thể duyệt phiếu mượn'));
      }

      const response = await borrowingService.update(
        { _id: new ObjectId(borrowingId) },
        { status: 'approved' }
      );
      if (!response) {
        return next(new ApiError(500, 'Có lỗi xảy ra khi duyệt phiếu mượn'));
      }
      console.log(response);

      return res.send({ status: 'ok' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },

  reject: async (req, res, next) => {
    const { borrowingId } = req.body;
    if (!borrowingId) {
      return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
    }
    try {
      const borrowingService = new BorrowingService(MongoDB.client);
      const borrowing = await borrowingService.findOne({
        _id: new ObjectId(borrowingId),
      });

      if (!borrowing) {
        return next(new ApiError(404, 'Không tìm thấy phiếu mượn'));
      }
      if (!(borrowing.status === 'registered')) {
        console.log(borrowing);
        return next(new ApiError(400, 'Không thể từ chối phiếu mượn'));
      }

      const response = await borrowingService.update(
        { _id: new ObjectId(borrowingId) },
        { status: 'rejected' }
      );
      if (!response) {
        return next(new ApiError(500, 'Có lỗi xảy ra khi từ chối phiếu mượn'));
      }

      return res.send({ status: 'ok' });
    } catch (error) {
      return next(new ApiError(500, 'Internal server error'));
    }
  },
};

module.exports = borrowingAdminController;

const express = require('express');
const adminRouter = express.Router();
const { requireAuth, checkAdmin } = require('../middleware/auth.middleware');
const borrowingAdminController = require('../controllers/borrowing.admin.controller');
const bookController = require('../controllers/book.controller');
const upload = require('../middleware/upload.middlware');

adminRouter.get(
  '/borrowings',
  requireAuth,
  checkAdmin,
  borrowingAdminController.index
);
adminRouter.patch(
  '/borrowings/approve',
  requireAuth,
  checkAdmin,
  borrowingAdminController.approve
);
adminRouter.patch(
  '/borrowings/reject',
  requireAuth,
  checkAdmin,
  borrowingAdminController.reject
);
adminRouter
  .route('/books/create')
  .get(requireAuth, checkAdmin, bookController.create)
  .post(requireAuth, checkAdmin, upload.any(), bookController.store);

module.exports = adminRouter;

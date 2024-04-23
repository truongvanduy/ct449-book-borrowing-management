const express = require('express');
const adminRouter = express.Router();
const { requireAuth, checkAdmin } = require('../middleware/auth.middleware');
const borrowingAdminController = require('../controllers/borrowing.admin.controller');
const bookController = require('../controllers/book.controller');
const upload = require('../middleware/upload.middlware');
const publisherController = require('../controllers/publisher.controller');

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
// Book routes
adminRouter
  .route('/books/create')
  .get(requireAuth, checkAdmin, bookController.create)
  .post(requireAuth, checkAdmin, upload.any(), bookController.store);
adminRouter
  .route('/books/edit')
  .patch(requireAuth, checkAdmin, upload.any(), bookController.update);
adminRouter
  .route('/books/:id/delete')
  .delete(requireAuth, checkAdmin, bookController.destroy);

// Publisher routes
adminRouter
  .route('/publishers')
  .get(requireAuth, checkAdmin, publisherController.index);
adminRouter
  .route('/publishers/create')
  .get(requireAuth, checkAdmin, publisherController.create)
  .post(requireAuth, checkAdmin, publisherController.store);
adminRouter
  .route('/publishers/:id/edit')
  .get(requireAuth, checkAdmin, publisherController.edit)
  .patch(requireAuth, checkAdmin, publisherController.update);
adminRouter
  .route('/publishers/:id/delete')
  .delete(requireAuth, checkAdmin, publisherController.destroy);

module.exports = adminRouter;

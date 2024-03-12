const express = require('express');
const bookController = require('../controllers/book.controller');
const userController = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/').get(bookController.findAll);
router.route('/api/books').get(bookController.findAll);
router.route('/api/books/:id').get(bookController.findOne);

router
  .route('/api/user')
  .get(userController.findByEmail)
  .post(userController.create);
router.route('/api/user/:id').get(userController.findById);

router.route('/api/signin').post(userController.signin);

router.route('/api/signout').post(userController.signout);

module.exports = router;

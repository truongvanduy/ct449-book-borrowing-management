const express = require('express');
const borrowingController = require('../controllers/borrowing.controller');
const { requireAuth, checkUser } = require('../middleware/auth.middleware');
const sendSuccess = require('../middleware/success.middleware');
const router = express.Router();

router
  .route('/')
  .get(requireAuth, checkUser, borrowingController.index)
  .post(
    requireAuth,
    checkUser,
    borrowingController.findOne,
    borrowingController.show
  )
  .patch(
    requireAuth,
    checkUser,
    borrowingController.findOne,
    borrowingController.register
  );
router.get(
  '/:bookId',
  requireAuth,
  checkUser,
  borrowingController.verifyBorrowing,
  sendSuccess
);

module.exports = router;

const express = require('express');
const userController = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter
  .route('/')
  .get(userController.findByEmail)
  .post(userController.create);
userRouter.route('/:id').get(userController.findById);
userRouter.route('/signin').post(userController.signin);
userRouter.route('/signout').post(userController.signout);

module.exports = userRouter;

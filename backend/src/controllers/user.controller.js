const ApiError = require('../api-error');
const UserService = require('../services/user.service');
const MongoDB = require('../utils/mongodb.util');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: maxAge,
  });
}

const userController = {
  findById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const userService = new UserService(MongoDB.client);
      const user = await userService.findOne({ _id: new ObjectId(id) });
      if (!user) {
        return next(new ApiError(404, 'User not found'));
      }

      return res.send({
        _id: user._id,
        email: user.email,
      });
    } catch (error) {
      return next(
        new ApiError(500, 'An error occurred while finding user: ' + error)
      );
    }
  },

  findByEmail: async (req, res, next) => {
    const { email } = req.query;
    console.log('email', email);

    if (email === undefined || email === '') {
      return next(new ApiError(400, 'Vui lòng nhập email'));
    }

    try {
      const userService = new UserService(MongoDB.client);
      const user = await userService.findOne({ email });
      if (!user) {
        return next(new ApiError(404, 'Email không tồn tại'));
      }
      return res.send({
        _id: user._id,
        email: user.email,
      });
    } catch (error) {
      return next(
        new ApiError(500, 'An error occurred while finding user: ' + error)
      );
    }
  },

  async create(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, 'Bạn chưa nhập email hoặc mật khẩu'));
    }

    try {
      // Create user
      const userService = new UserService(MongoDB.client);

      const existedUser = await userService.findOne({ email });
      if (existedUser) {
        return next(new ApiError(400, 'Địa chỉ email đã tồn tại'));
      }

      const insertedId = await userService.create({ email, password });

      // Set cookies
      const token = createToken(insertedId);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

      return res.send({ message: 'User ' + insertedId + ' created' });
    } catch (error) {
      return next(
        new ApiError(
          500,
          `Error occurred while creating  user account: ${error}`
        )
      );
    }
  },

  async signin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, 'Bạn chưa nhập email hoặc mật khẩu'));
    }

    try {
      // Authenticate the user
      const userService = new UserService(MongoDB.client);
      const user = await userService.signin(email, password);

      // Set cookies
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

      res.send({ id: user._id });
    } catch (error) {
      return next(new ApiError(400, error.message));
    }
  },

  async signout(req, res, next) {
    res.cookie('jwt', '', { maxAge: 1 });
    return res.send();
  },
};

module.exports = userController;

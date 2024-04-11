const jwt = require('jsonwebtoken');
const ApiError = require('../api-error');
const UserService = require('../services/user.service');
const MongoDB = require('../utils/mongodb.util');

const requireAuth = (req, res, next) => {
  const token = req?.cookies?.jwt;
  console.log(req.cookies);

  if (!token) {
    return next(new ApiError(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decodedToken) => {
    if (err) {
      return next(new ApiError(401, 'Unauthorized: ' + error.message));
    }
    next();
  });
};

const checkUser = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'secret',
    async (err, decodedToken) => {
      if (err) {
        console.log(error.mesage);
        res.locals.user = null;
        return next();
      }

      const userService = new UserService(MongoDB.client);
      let user = await userService.findOne({ _id: decodedToken.id });
      res.locals.user = user;
      return next();
    }
  );
};

module.exports = { requireAuth, checkUser };

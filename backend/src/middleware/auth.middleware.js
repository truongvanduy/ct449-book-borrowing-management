const jwt = require('jsonwebtoken');
const ApiError = require('../api-error');
const UserService = require('../services/user.service');
const MongoDB = require('../utils/mongodb.util');
const { ObjectId } = require('mongodb');

const requireAuth = (req, res, next) => {
  const token = req?.cookies?.jwt;

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

const checkUser = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'secret',
    async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        req.user = null;
        return next();
      }

      const userService = new UserService(MongoDB.client);
      let user = await userService.findOne({
        _id: new ObjectId(decodedToken.id),
      });

      req.user = user;
      return next();
    }
  );
};
const checkAdmin = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    req.admin = null;
    return next();
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'secret',
    async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        req.admin = null;
        return next();
      }

      const userService = new UserService(MongoDB.client);
      let user = await userService.findOne({
        _id: new ObjectId(decodedToken.id),
      });
      if (user.role !== 'admin') {
        req.admin = null;
        return next();
      }

      req.admin = user;
      return next();
    }
  );
};

module.exports = { requireAuth, checkUser, checkAdmin };

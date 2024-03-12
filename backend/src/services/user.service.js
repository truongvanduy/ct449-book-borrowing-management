const bcrypt = require('bcrypt');

class UserService {
  constructor(client) {
    this.User = client.db().collection('users');
  }

  async findOne(filter) {
    return await this.User.findOne(filter);
  }

  async create(user) {
    const salt = await bcrypt.genSalt();

    user.password = await bcrypt.hash(user.password, salt);

    const { insertedId } = await this.User.insertOne(user);

    return insertedId;
  }

  async signin(email, password) {
    const user = await this.User.findOne({ email });
    if (!user) {
      throw Error('Email không tồn tại');
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw Error('Mật khẩu không đúng');
    }
    return user;
  }
}

module.exports = UserService;

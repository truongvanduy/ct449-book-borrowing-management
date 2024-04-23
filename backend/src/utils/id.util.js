const { ObjectId } = require('mongodb');

module.exports = (id) => {
  if (typeof id !== 'string') {
    id = id.toString();
  }
  if (id.length === 24) {
    return new ObjectId(id);
  }
  return id;
};

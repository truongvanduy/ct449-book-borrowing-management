const { ObjectId } = require('mongodb');

module.exports = (id) => {
  if (!id) return id;
  if (typeof id !== 'string') {
    return id;
  }
  if (id.length === 24) {
    return new ObjectId(id);
  }
  return id;
};

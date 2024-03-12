const app = require('./app');
const config = require('./src/config');
const MongoDB = require('./src/utils/mongodb.util');

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log('Connected to the Database!');

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}!`);
    });
  } catch (error) {
    console.log('Cannot connect to the Database! ', error);
    process.exit();
  }
}

startServer();

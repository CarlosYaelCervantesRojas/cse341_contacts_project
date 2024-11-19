const { MongoClient } = require('mongodb');

const uri = process.env.URI;

let client;
function initClient(callback) {
  if (client) {
    console.log('MongoDB connection is already initialized!');
    return callback(null, client);
  }

  const mongoClient = new MongoClient(uri);

  mongoClient
    .connect()
    .then((mongoClient) => {
      client = mongoClient;
      callback(null, client);
    })
    .catch((err) => {
      callback(err);
    });
}

function getClient() {
  if (!client) {
    throw Error('MongoDB connection is not initialized');
  }
  return client;
}

module.exports = {
  initClient,
  getClient
};

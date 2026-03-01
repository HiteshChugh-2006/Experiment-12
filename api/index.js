const serverless = require("serverless-http");
const app = require("../src/app");
const { connectRedis } = require("../src/config/redis");

let isConnected = false;

const handler = serverless(app);

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectRedis();
    isConnected = true;
  }

  return handler(req, res);
};
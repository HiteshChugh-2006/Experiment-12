const app = require("../src/app");
const { connectRedis } = require("../src/config/redis");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectRedis();
    isConnected = true;
  }

  return app(req, res);
};
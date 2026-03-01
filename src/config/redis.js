require("dotenv").config();
const { createClient } = require("redis");

let client;

async function getRedisClient() {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL,
    });

    client.on("error", (err) => {
      console.log("Redis Error:", err);
    });

    await client.connect();
    console.log("✅ Redis Connected (Serverless)");
  }

  return client;
}

module.exports = { getRedisClient };
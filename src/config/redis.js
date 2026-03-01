require("dotenv").config();
const { createClient } = require("redis");

let client;

async function getRedisClient() {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        tls: true,
        rejectUnauthorized: false
      }
    });

    client.on("error", (err) => {
      console.log("Redis Error:", err);
    });

    await client.connect();
    console.log("✅ Redis Connected (TLS)");
  }

  return client;
}

module.exports = { getRedisClient };
const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

async function connectRedis() {
  client.on("error", (err) => {
    console.error("Redis Error:", err);
  });

  await client.connect();
  console.log("✅ Redis Connected");
}

module.exports = {
  client,
  connectRedis,
};
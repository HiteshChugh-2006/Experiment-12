const { getRedisClient } = require("../config/redis");
const { v4: uuidv4 } = require("uuid");

const LOCK_EXPIRY = 30; // 30 seconds

// Acquire Lock
async function acquireLock(seatId) {
    const redisClient = await getRedisClient();
    const lockKey = `lock:seat:${seatId}`;
    const lockValue = uuidv4(); // unique lock owner

    const result = await redisClient.set(lockKey, lockValue, {
        NX: true,
        EX: LOCK_EXPIRY
    });

    if (!result) {
        return null; // lock already exists
    }

    return lockValue; // return owner ID
}

// Release Lock (Safe Unlock)
// Safe atomic unlock using Lua script
async function releaseLock(seatId, lockValue) {
    const redisClient = await getRedisClient();
    const lockKey = `lock:seat:${seatId}`;

    const luaScript = `
        if redis.call("get", KEYS[1]) == ARGV[1]
        then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
    `;

    const result = await redisClient.eval(luaScript, {
        keys: [lockKey],
        arguments: [lockValue]
    });

    return result === 1;
}

module.exports = {
    acquireLock,
    releaseLock
};
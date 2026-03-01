const { client } = require("../config/redis");
const { v4: uuidv4 } = require("uuid");

const LOCK_PREFIX = "lock:seat:";
const LOCK_TTL = 10; // seconds

// Acquire lock
async function acquireLock(seatId) {
  const lockKey = `${LOCK_PREFIX}${seatId}`;
  const lockValue = uuidv4();

  const result = await client.set(lockKey, lockValue, {
    NX: true,
    EX: LOCK_TTL,
  });

  if (result === null) {
    return null;
  }

  return lockValue;
}

// Release lock
async function releaseLock(seatId, lockValue) {
  const lockKey = `${LOCK_PREFIX}${seatId}`;

  const currentValue = await client.get(lockKey);

  if (currentValue === lockValue) {
    await client.del(lockKey);
  }
}

module.exports = {
  acquireLock,
  releaseLock,
};
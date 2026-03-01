const { acquireLock, releaseLock } = require("../../utils/lock.util");
const { isSeatBooked, bookSeat } = require("./booking.model");

async function createBooking(seatId) {
    // Step 1: Try acquiring lock
    const lockValue = await acquireLock(seatId);

    if (!lockValue) {
        return { success: false, message: "Seat is currently locked by another user." };
    }

    try {
        // Step 2: Check if seat already booked
        if (isSeatBooked(seatId)) {
            return { success: false, message: "Seat already booked." };
        }

        // Step 3: Simulate booking process
        await new Promise(resolve => setTimeout(resolve, 2000));

        bookSeat(seatId);

        return { success: true, message: "Seat booked successfully!" };

    } finally {
        // Step 4: Always release lock
        await releaseLock(seatId, lockValue);
    }
}

module.exports = {
    createBooking
};
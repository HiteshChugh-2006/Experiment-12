// Fake in-memory database

const bookedSeats = new Set();

function isSeatBooked(seatId) {
    return bookedSeats.has(seatId);
}

function bookSeat(seatId) {
    bookedSeats.add(seatId);
}

module.exports = {
    isSeatBooked,
    bookSeat
};
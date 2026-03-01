const { createBooking } = require("./booking.service");

async function bookSeat(req, res) {
    const { seatId } = req.body;

    if (!seatId) {
        return res.status(400).json({ message: "Seat ID required" });
    }

    const result = await createBooking(seatId);

    if (!result.success) {
        return res.status(400).json(result);
    }

    res.status(200).json(result);
}

module.exports = {
    bookSeat
};
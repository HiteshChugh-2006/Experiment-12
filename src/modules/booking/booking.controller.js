const { createBooking } = require("./booking.service");

const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.body;

    if (!seatId) {
      return res.status(400).json({ message: "Seat ID required" });
    }

    const result = await createBooking(seatId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  bookSeat
};
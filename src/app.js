const express = require("express");
const bookingRoutes = require("./modules/booking/booking.route");

const app = express();

app.use(express.json());

app.use("/booking", bookingRoutes);

app.get("/", (req, res) => {
    res.send("Redis Seat Locking API Running");
});

module.exports = app;
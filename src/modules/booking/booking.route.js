const express = require("express");
const { bookSeat } = require("./booking.controller");

const router = express.Router();

router.post("/", bookSeat);

module.exports = router;
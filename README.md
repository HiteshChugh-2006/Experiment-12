**Concurrent Ticket Booking System (Redis Locking)**

_Overview_

This project implements a concurrent ticket booking system using Node.js, Express.js, and Redis.
Redis is used to implement a distributed lock so that multiple users cannot book the same seat simultaneously.

_Live Demo_

API Base URL:

https://experiment-12.onrender.com

**API Usage** 

_Book a Seat_

POST

/booking

_Full URL:_

https://experiment-12.onrender.com/booking

**Request Body**
{

  "seatId": "A1"
  
}

**Success Response**
{

  "success": true,
  "message": "Seat booked successfully!"
  
}

**Failure Response**
{

  "success": false,
  
  }

const express = require('express');
const meetingsRouter = express.Router();
const { 
  createMeeting,
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase
} = require('./db');



// Meetings API:
// GET Request handler for all meetings:
meetingsRouter.get('/', (req, res, next) => {
  res.status(200).send(getAllFromDatabase('meetings'));
});

// POST Request handler for creating a meeting:
meetingsRouter.post('/', (req, res, next) => {
  res.status(201).send(addToDatabase('meetings', createMeeting()))
});

// DELETE Request handler for deleting all meetings:
meetingsRouter.delete('/', (req, res, next) => {
  res.status(204).send(deleteAllFromDatabase('meetings'))
});



module.exports = meetingsRouter;
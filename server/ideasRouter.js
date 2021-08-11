const express = require('express');
const ideasRouter = express.Router();
const { 
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');



// Ideas API:
// ideaID param settings:
ideasRouter.param('ideaId', (req, res, next, id) => {
  if (!(getFromDatabaseById('ideas', id))) {
    res.status(404).send('Idea not found!');
  } else {
    req.id = id;
    next();
  }
})

// GET Request handler for all ideas:
ideasRouter.get('/', (req, res, next) => {
  res.status(200).send(getAllFromDatabase('ideas'));
});

// GET Request handler for getting a single idea:
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.status(200).send(getFromDatabaseById('ideas', req.id));
});

// PUT Request handler for updating a single idea:
ideasRouter.put('/:ideaId', (req, res, next) => {
  res.status(200).send(updateInstanceInDatabase('ideas', req.body))
});

// POST Request handler for creating a single idea:
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  res.status(201).send(addToDatabase('ideas', req.body))
});

// DELETE Request handler for deleting a single idea:
ideasRouter.delete('/:ideaId', (req, res, next) => {
  res.status(204).send(deleteFromDatabasebyId('ideas', req.id))
});



module.exports = ideasRouter;
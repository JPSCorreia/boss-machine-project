const express = require('express');
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// Minions API:
// minionID param settings:
minionsRouter.param('minionId', (req, res, next, id) => {
  if (!getFromDatabaseById('minions', id)) {
    res.status(404).send('Minion not found!');
  } else {
    req.minion = getFromDatabaseById('minions', id);
    next();
  }
});

// GET Request handler for all minions:
minionsRouter.get('/', (req, res, next) => {
  res.status(200).send(getAllFromDatabase('minions'));
});

// GET Request handler for getting a single minion:
minionsRouter.get('/:minionId', (req, res, next) => {
  res.status(200).send(getFromDatabaseById('minions', req.params.minionId));
});

// PUT Request handler for updating a single minion:
minionsRouter.put('/:minionId', (req, res, next) => {
  res.status(200).send(updateInstanceInDatabase('minions', req.body));
});

// POST Request handler for creating a single minion:
minionsRouter.post('/', (req, res, next) => {
  res.status(201).send(addToDatabase('minions', req.body));
});

// DELETE Request handler for deleting a single minion:
minionsRouter.delete('/:minionId', (req, res, next) => {
  res.status(204).send(deleteFromDatabasebyId('minions', req.params.minionId));
});

// Work API:
// workID param settings:
minionsRouter.param('workId', (req, res, next, id) => {
  if (!getFromDatabaseById('work', id)) {
    res.status(404).send('Work not found!');
  } else {
    req.work = getFromDatabaseById('work', id);
    next();
  }
});

// GET Request handler for getting a single work:
minionsRouter.get('/:minionId/work', (req, res, next) => {
  res.send(
    getAllFromDatabase('work').filter((element) => {
      return element.minionId === req.params.minionId;
    })
  );
});

// PUT Request handler for updating a single work:
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    res.status(200).send(updateInstanceInDatabase('work', req.body));
  }
});

// POST Request handler for creating a single work:
minionsRouter.post('/:minionId/work', (req, res, next) => {
  res.status(201).send(addToDatabase('work', req.body));
});

// DELETE Request handler for deleting a single work:
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  res.status(204).send(deleteFromDatabasebyId('work', req.params.minionId));
});

module.exports = minionsRouter;

const express = require('express');
const apiRouter = express.Router();



// minionsRouter importing and mounting:
const minionsRouter = require('./minionsRouter');
apiRouter.use('/minions', minionsRouter);

// ideasRouter importing and mounting:
const ideasRouter =  require('./ideasRouter');
apiRouter.use('/ideas', ideasRouter);

// meetingsRouter importing and mounting:
const meetingsRouter = require('./meetingsRouter');
apiRouter.use('/meetings', meetingsRouter);



module.exports = apiRouter;
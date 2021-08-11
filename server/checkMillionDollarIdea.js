
const checkMillionDollarIdea = (req, res, next) => {
  const totalSum = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);
  if ( isNaN(totalSum) || !req.body.numWeeks || !req.body.weeklyRevenue || totalSum < 1000000) {
    res.status(400).send();
  } else {
    next();
  }
  
};






// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

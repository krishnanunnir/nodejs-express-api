const cache = require('../models/cache');
/*
For the PUT and GET requests, we are updating the last_refresh_at field value using a middleware
so we can keep track of which records are being actively accessed and which are not.
*/
module.exports = function updatedLastRefreshedAT(req, res, next) {
  const keyVal = req.body.key;
  if (keyVal.length === 0) {
    next();
  }
  cache.updateOne(
    { key: keyVal },
    { last_refresh_at: Date.now() },
    (err, data) => {
      if (err) return next(err);
      return next();
    }
  );

  next();
};

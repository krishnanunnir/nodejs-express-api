const Cache = require('../models/cache');
// This method clears out expired cache records -for expired cache records generating new data
// and deleting and requesting a new record would be equivalent

module.exports = function clearExpiredCache(req, res, next) {
  Cache.deleteMany({ isExpired: true }, (err, data) => {
    if (err) return next(err);
  });
  next();
};

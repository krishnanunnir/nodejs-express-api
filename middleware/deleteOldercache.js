/* Every time a cacherecord is accessed via GET or PUT we update the value of the last_refreshed_at
value In effect the last_refreshed_at will behave as a frequency count, one that has been recently
accessed will have more chance to be accessed again.

Similary the record that have very old last_refresh_at haven't been accessed frequently, we can
assume the user won't be accessing it as frequently and we can remove it.

Assuming a cache limit of 1000
And we would remove the last 100
*/
const Cache = require('../models/cache');

module.exports = function deleteOlderCache(req, res, next) {
  Cache.countDocuments({}, (count, err) => {
    // move from hardcoded values
    const numberOfDocumentsToRemove = count - 900;
    if (count > 1000) {
      const removeIdsArray = Cache.find({}, { _id: 1 })
        .limit(numberOfDocumentsToRemove)
        .sort({ created_at: -1 })
        .toArray()
        .map(() => doc._id);
      Cache.remove({ _id: { $in: removeIdsArray } });
      next();
    }
    next();
  });
};

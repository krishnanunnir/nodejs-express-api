const express = require('express');
const {
  getAllCacheValues,
  getCacheValueByKey,
  createOrUpdateCache,
  removeAllKeysFromCache,
  removeFromCacheByKey,
} = require('../controllers/cacheController');

// For getting a single cache key value, we have two approaches
// 1. We have a separate url for getting cache details and we pass the key
// details along with the request.
// 2. We pass the key or the id in the url like  /cache/:id or /cache/:key.

// Going with the #1 approach since passing a long alpha numeric string in the url isn't very
// developer friendly, also in case of a cache, every record is short lived and can be overwritten
// this would mean the url will be obsolete very quickly.

const router = express.Router();
router.get('/cache', getAllCacheValues);
router.get('/cache/key/', getCacheValueByKey);
// router.get('/cache/:key', getCacheValueByKey);
router.put('/cache/', createOrUpdateCache);
router.delete('/cache/', removeAllKeysFromCache);
router.delete('/cache/key/', removeFromCacheByKey);
// router.delete('/cache/:key', removeFromCacheByKey);

module.exports = router;

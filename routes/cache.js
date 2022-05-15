const express = require('express');
const {
  getAllCacheValues,
  createOrUpdateCache,
  removeAllKeysFromCache,
  removeAllKeysFromCache,
  removeFromCacheByKey,
} = require('../controllers/cacheController');
const router = express.Router();

router.get(`cache/`, getAllCacheValues);
router.get(`cache/:key`, getCacheValueByKey);
router.put(`cache/`, createOrUpdateCache);
router.delete(`cache/`, removeAllKeysFromCache);
router.delete(`cache/:key`, removeFromCacheByKey);

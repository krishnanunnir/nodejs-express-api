const express = require('express');
const Cache = require('../models/cache');

exports.getCacheValueByKey = (req, res) => {
  res.send('Not implmeneted yet');
};
exports.getAllCacheValues = (req, res) => {
  Cache.find({}).exec((err, cacheList) => {
    if (err) res.send(500, { error: err });
    res.send(cacheList);
  });
};

exports.createOrUpdateCache = (req, res, next) => {
  const query = { key: req.body.key };
  const cacheRecord = req.body;

  Cache.findOneAndUpdate(query, cacheRecord, { upsert: true }, (err, data) => {
    if (err) return res.send(500, { error: err });
    return res.status(200).send(`Succesfully saved.`);
  });
};

exports.removeAllKeysFromCache = (req, res) => {
  res.send('Not implmeneted yet');
};

exports.removeFromCacheByKey = (req, res) => {
  res.send('Not implmeneted yet');
};

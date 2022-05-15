const express = require('express');
const Cache = require('../models/cache');
const crypto = require('crypto');

exports.getCacheValueByKey = (req, res) => {
  const query = { key: req.body.key };
  // TODO: search not working, create if doesn't exist working
  const newRecord = new Cache({ key: req.body.key, value: 'hello' });

  Cache.findOneAndUpdate(query, newRecord, { upsert: true }, (err, data) => {
    if (err) return res.send(500, { error: err });
    return res.status(200).send(data);
  });
};

exports.getAllCacheValues = (req, res) => {
  Cache.find({}).exec((err, cacheList) => {
    if (err) res.send(500, { error: err });
    res.send(cacheList);
  });
};

exports.createOrUpdateCache = (req, res) => {
  const query = { key: req.body.key };
  const cacheRecord = req.body;

  Cache.updateOne(query, cacheRecord, { upsert: true }, (err, data) => {
    if (err) return res.send(500, { error: err });
    if (data.modifiedCount === 0 && data.upsertedCount !== 0) {
      return res.status(200).send(`record created for key :: ${req.body.key}`);
    }
    if (data.modifiedCount !== 0) {
      return res.status(200).send(`record updated for key :: ${req.body.key}`);
    }
    return res
      .status(200)
      .send(`nothing to be done for key :: ${req.body.key}`);
  });
};

exports.removeAllKeysFromCache = (req, res) => {
  Cache.deleteMany({}, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).send(`Deleted ${data.deletedCount} Cache keys`);
  });
};

exports.removeFromCacheByKey = (req, res) => {
  // TODO: send the deleted document
  Cache.findOneAndRemove({ key: req.body.key }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.send(`Deleted Key :: ${data.key}`);
  });
};

const express = require('express');
const crypto = require('crypto');
const Cache = require('../models/cache');

exports.getCacheValueByKey = (req, res) => {
  /*
  A controller for GET request to /cache/key/

  if a cache record exists for the key passed along with the request, it is returned
  otherwise a new record is created.

  TODO: search not working, create if doesn't exist working
  */

  const query = { key: req.body.key };

  // We use crypto module to generate random strings
  const newRecord = new Cache({
    key: req.body.key,
    value: crypto.randomBytes(20).toString('hex'),
  });
  // finds if exists, otherwise it creates the document
  Cache.findOneAndUpdate(query, newRecord, { upsert: true }, (err, data) => {
    if (err) return res.send(500, { error: err });
    return res.status(200).send(data);
  });
};

exports.getAllCacheValues = (req, res) => {
  /*
  A controller corresponding to GET request to /cache/

  Returns all the existing cache recoreds.
  */
  Cache.find({}).exec((err, cacheList) => {
    if (err) res.send(500, { error: err });
    res.send(cacheList);
  });
};

exports.createOrUpdateCache = (req, res) => {
  /*
    A controller corresponding to PUT request to /cache/

    If a record exist for the data passed then the data is updated.
    This would mean the value of the record is updated to a a new random
    string.
  */
  const query = { key: req.body.key };

  /*
  the returned data for updateOne would look like

  {"acknowledged":true,"modifiedCount":1,"upsertedId":null,"upsertedCount":0,"matchedCount":1}%

  if the document is updated then the modifiedCount will be incremented

  if the document is newly Created then the upsertedCount will be incremeented
  */
  Cache.updateOne(
    query,
    { key: req.body.key, value: crypto.randomBytes(20).toString('hex') }, // passing the record to update with
    { upsert: true },
    (err, data) => {
      if (err) return res.send(500, { error: err });
      if (data.modifiedCount === 0 && data.upsertedCount !== 0) {
        return res
          .status(200)
          .send(`record created for key :: ${req.body.key}`);
      }
      if (data.modifiedCount !== 0) {
        return res
          .status(200)
          .send(`record updated for key :: ${req.body.key}`);
      }
      return res
        .status(200)
        .send(`nothing to be done for key :: ${req.body.key}`);
    },
  );
};

exports.removeAllKeysFromCache = (req, res) => {
  /*
  Removes all the cached records
  */
  Cache.deleteMany({}, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).send(`Deleted ${data.deletedCount} Cache keys`);
  });
};

exports.removeFromCacheByKey = (req, res) => {
  /*
  Remove the passed key from the records
  */
  Cache.findOneAndRemove({ key: req.body.key }, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.send(`Deleted Key :: ${data.key}`);
  });
};

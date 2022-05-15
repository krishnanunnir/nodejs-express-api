const { Schema, model } = require('mongoose');

const CacheSchema = new Schema({
  key: { type: String, rquired: true, unique: true },
  value: { type: String, required: true },
  last_refresh_at: { type: Date },
  ttl: { type: Number, default: 60000 }, // ttl stored in milliseconds
  created_at: { type: Date, default: Date.now() },
});

CacheSchema.virtual('isExpired').get(() => {
  const now = new Date();
  const diffTime = Math.abs(now - this.last_refresh_at);
  if (diffTime > this.ttl) {
    return true;
  }
  return false;
});

module.exports = model('Cache', CacheSchema);

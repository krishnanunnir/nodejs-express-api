const { Schema, model } = require('mongoose');

const CacheSchema = new Schema({
    key: { type: String, rquired: true },
    value: { type: String, required: true },
    last_refresh_at: { type: Date, required: true },
    ttl: { type: Number, required: true }, // ttl stored in milliseconds
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

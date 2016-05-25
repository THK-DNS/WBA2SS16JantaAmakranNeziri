const redis = require('redis');

var client = redis.createClient({ host: process.env.REDIS_DB_HOST, port: process.env.REDIS_DB_PORT, password: process.env.REDIS_DB_PASS, db: 0 });

module.exports = client;
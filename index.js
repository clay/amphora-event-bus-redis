'use strict';

const Redis = require('ioredis'),
  redis = new Redis(process.env.CLAY_BUS_HOST),
  os = require('os'),
  HOSTNAME = os.hostname();
var log = require('./log').setup({ file: __filename });

function connect() {
  log('info', `Connecting to Redis Event Bus at ${process.env.CLAY_BUS_HOST}`);
  module.exports.client = new Redis(process.env.CLAY_BUS_HOST);
  return { publish };
}

function publish(topic, msg) {
  if (module.exports.client) {
    redis.publish(topic, JSON.stringify({
      hostname: HOSTNAME,
      pid: process.pid,
      msg
    }));
  }
}

module.exports.connect = connect;
module.exports.publish = publish;

// For testing
module.exports.setLog = mock => log = mock;

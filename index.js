'use strict';

const Redis = require('ioredis'),
  redis = new Redis(process.env.CLAY_BUS_HOST),
  os = require('os'),
  HOSTNAME = os.hostname(),
  PID = process.pid;
var log = require('./log').setup({ file: __filename });

/**
 * Connect to Redis
 *
 * @returns {Object}
 */
function connect() {
  log('info', `Connecting to Redis Event Bus at ${process.env.CLAY_BUS_HOST}`);
  module.exports.client = new Redis(process.env.CLAY_BUS_HOST);

  return { publish };
}

/**
 * Write to the bus
 *
 * @param {String} topic
 * @param {Object|Array} msg
 */
function publish(topic, msg) {
  if (module.exports.client) {
    redis.publish(topic, JSON.stringify({
      hostname: HOSTNAME,
      pid: PID,
      msg
    }));
  }
}

module.exports.connect = connect;
module.exports.publish = publish;

// For testing
module.exports.setLog = mock => log = mock;

'use strict';

const clayLog = require('clay-log'),
  pkg = require('./package.json');
var logInstance;

function init() {
  if (logInstance) {
    return;
  }

  // Initialize the logger
  clayLog.init({
    name: 'amphora-event-bus-redis',
    meta: {
      amphoraEventBusRedisVersion: pkg.version
    }
  });

  // Store the log instance
  logInstance = clayLog.getLogger();
}

function setup(meta) {
  return clayLog.meta(meta, logInstance);
}

function setLogger(replacement) {
  logInstance = replacement;
}

// Initialize immediately on require of file
init();

module.exports.setup = setup;

// For testing
module.exports.init = init;
module.exports.setLogger = setLogger;

'use strict';

const lib = require('./index'),
  Redis = require('ioredis'),
  fakeLog = jest.fn();

jest.mock('ioredis');

beforeEach(() => {
  lib.setLog(fakeLog);
});

describe('index', () => {
  describe('connect', () => {
    test('logs the connections', () => {
      const result = lib.connect();

      expect(fakeLog.mock.calls.length).toBe(1);
      expect(typeof result.publish === 'function').toBeTruthy();
    });
  });

  describe('publish', () => {
    test('it does not call publish if no client is assigned', () => {
      lib.client = false;
      lib.publish('topic', 'msg');
      expect(Redis.prototype.publish.mock.calls.length).toBe(0);
    });

    test('calls publish if a client is set', () => {
      lib.client = true;
      lib.publish('topic', 'msg');
      expect(Redis.prototype.publish.mock.calls.length).toBe(1);
    });
  });
});

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { sum } = require('../src/sum');

test('sum adds two positive numbers', () => {
  assert.equal(sum(2, 3), 5);
});

test('sum handles negative numbers', () => {
  assert.equal(sum(-1, 1), 0);
});

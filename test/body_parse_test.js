'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const parse = require('../lib/body_parse.js');
const body = fs.readFileSync(`${__dirname}/test_body.json`);

describe('parse', () => {
  const parsed = parse(body);

  it('should be a function', () => {
    expect(parse).to.be.a('function');
  });

  it('should return an object', () => {
    expect(parsed).to.be.an('object');
  });

  it('should return an object with 20 keys 1-20', () => {
    const keys = [...Array(20).keys()].map(key => key + 1);
    keys.forEach(key => {
      expect(parsed.hasOwnProperty(key)).to.equal(true)
    });
  });

  it('should return an object where each value is a story', () => {
    const reuters = parsed[17];
    expect(reuters.source).to.equal('CNBC');
    expect(reuters.author).to.equal('Reuters');
    expect(reuters.title).to.equal('Iran foreign minister makes surprise visit to France during G7 but has no plans to meet with US - CNBC');
    expect(reuters.description).to.equal('Mohammad Javad Zarif was holding talks with his French counterpart to assess what conditions could lead to a de-escalation of tension between Tehran and Washington, a French official said.')
  });
});

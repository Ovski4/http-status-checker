'use strict';

const assert = require('assert');
const isInternalRule = require('../../../src/responseCollection/rules/isInternal');

describe('Link is internal', function() {

    const configuration = {
        base_url: 'https://example.com'
    };

    const link = 'https://example.com/path/';
    it('Should return true', function() {
        assert.equal(true, isInternalRule.matches(link, configuration));
    });

    const link2 = 'http://example.com/path/tab1#';
    it('Should return true', function() {
        assert.equal(true, isInternalRule.matches(link2, configuration));
    });

    const link3 = 'http://other.example.com/path/tab1#';
    it('Should return false', function() {
        assert.equal(false, isInternalRule.matches(link3, configuration));
    });

});

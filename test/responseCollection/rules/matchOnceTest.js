'use strict';

const assert = require('assert');
const matchOnceRule = require('../../../src/responseCollection/rules/matchOnce');
const ResponseCollection = require('../../../src/responseCollection/ResponseCollection');

describe('Link match only once in the collection', function() {
    const responseCollection = new ResponseCollection();
    const configuration = {
        base_url: 'https://example.com',
        follow_once_patterns: [
            '\/edition\/[a-z]+-[a-z]+\/[0-9]+\/edit',
        ]
    };

    it('Should return true', function() {
        const link1 = 'https://example.com/show/bob-marley/1/edit';
        assert.equal(true, matchOnceRule.matches(link1, configuration, responseCollection));
        responseCollection.add({ url: link1});
    });

    it('Should return true', function() {
        const link2 = 'https://example.com/edition/bob-marley/1/edit';
        assert.equal(true, matchOnceRule.matches(link2, configuration, responseCollection));
        responseCollection.add({ url: link2});
    });

    it('Should return true', function() {
        const link3 = 'https://example.com/show/bob-marley/1/edit';
        assert.equal(true, matchOnceRule.matches(link3, configuration, responseCollection));
        responseCollection.add({ url: link3});
    });

    it('Should return false', function() {
        const link4 = 'https://example.com/edition/bob-sinclar/1/edit';
        assert.equal(false, matchOnceRule.matches(link4, configuration, responseCollection));
    });

});

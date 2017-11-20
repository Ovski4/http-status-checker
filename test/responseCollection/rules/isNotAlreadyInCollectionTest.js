'use strict';

const assert = require('assert');
const ResponseCollection = require('../../../src/responseCollection/ResponseCollection');
const isNotAlreadyInCollectionRule = require('../../../src/responseCollection/rules/isNotAlreadyInCollection');

describe('Link is not already in collection', function() {

    const configuration = {};
    const responseCollection = new ResponseCollection();
    responseCollection
        .add({ url: 'https://example.com'})
        .add({ url: 'https://example.com/page1'})
        .add({ url: 'https://example.com/page1?s=test'})
        .add({ url: 'https://example.com/page2'})
    ;

    const link = 'https://example.com/path/';
    it('Should return true', function() {
        assert.equal(true, isNotAlreadyInCollectionRule.matches(link, configuration, responseCollection));
    });

    const link2 = 'https://example.com/page2';
    it('Should return false', function() {
        assert.equal(false, isNotAlreadyInCollectionRule.matches(link2, configuration, responseCollection));
    });

    const link3 = 'https://example.com/page1?s=test';
    it('Should return false', function() {
        assert.equal(false, isNotAlreadyInCollectionRule.matches(link3, configuration, responseCollection));
    });

});

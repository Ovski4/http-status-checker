'use strict';

const assert = require('assert');
const neverMatchRule = require('../../../src/responseCollection/rules/neverMatch');

describe('Matching link should never be added', function() {
    const configuration = {
        base_url: 'https://example.com',
        never_follow_patterns: [
            '\/edition\/[a-z]+-[a-z]+\/[0-9]+\/edit',
        ]
    };

    it('Should return true', function() {
        const link1 = 'https://example.com/show/bob-marley/1/edit';
        assert.equal(true, neverMatchRule.matches(link1, configuration));
    });

    it('Should return false', function() {
        const link2 = 'https://example.com/edition/bob-marley/1/edit';
        assert.equal(false, neverMatchRule.matches(link2, configuration));
    });

    it('Should return false', function() {
        const link3 = 'https://example.com/edition/bob-sinclar/15656/edit';
        assert.equal(false, neverMatchRule.matches(link3, configuration));
    });

});

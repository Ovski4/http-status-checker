'use strict';

const assert = require('assert');
const endsNotWithSharpRule = require('../../../src/responseCollection/rules/endsNotWithSharp');

describe('Link ends not with sharp rule', function() {

    const link = 'http://example.com/path/';
    it('Should return true', function() {
        assert.equal(true, endsNotWithSharpRule.matches(link));
    });

    const link2 = 'http://example.com/path/tab1#';
    it('Should return false', function() {
        assert.equal(false, endsNotWithSharpRule.matches(link2));
    });

});

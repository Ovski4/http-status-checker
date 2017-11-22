'use strict';

const assert = require('assert');
const linkTool = require('../../src/tools/link');

describe('Get the full url from a string (relative or full link) and a referer', function() {

    it('Should be equals', function() {
        const link = 'http://example.com/path?test=1';
        const expected = 'http://example.com/path?test=1';
        assert.equal(expected, linkTool.getFullUrl(link));
    });

    it('Should be equals', function() {
        const link = '/path?test=1';
        const referer = 'http://example.com';
        const expected = 'http://example.com/path?test=1';
        assert.equal(expected, linkTool.getFullUrl(link, referer));
    });

    it('Should be equals', function() {
        const link = '/path?test=1';
        const referer = 'http://example.com/';
        const expected = 'http://example.com/path?test=1';
        assert.equal(expected, linkTool.getFullUrl(link, referer));
    });

    it('Should be equals', function() {
        const link = 'path?test=1';
        const referer = 'http://example.com';
        const expected = 'http://example.com/path?test=1';
        assert.equal(expected, linkTool.getFullUrl(link, referer));
    });

});

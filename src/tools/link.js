'use strict';

const { URL } = require('url');

module.exports = {

    getFullUrl (link, referer) {
        if (link.indexOf('http') === 0 || link.indexOf('//') === 0) {
            return link;
        }

        if (typeof referer === 'undefined') {
            throw 'Cannot build a full url from a relative link without a referer';
        }

        return new URL(link, referer).href.replace(/(#.*)/, '');
    }
};

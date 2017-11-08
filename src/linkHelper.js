'use strict';

const { URL } = require('url');

module.exports = class LinkHelper {

    constructor (baseUrl) {
        this.baseUrl = baseUrl;
    }

    getFullUrl (relativeUrl) {
        let url = new URL(relativeUrl, this.baseUrl);

        return url.href.replace(/(#.*)/, '');
    }

    isExternal (url) {
        return url.indexOf(this.baseUrl) !== 0;
    }
};

'use strict';

const { URL } = require('url');

module.exports = {

    equals (link1, link2) {
        let url1 = new URL(link1);
        let url2 = new URL(link2);

        if (url1.host === url2.host) {
            return true;
        }
    }
};

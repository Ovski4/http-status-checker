'use strict';

const { URL } = require('url');

module.exports = {

    matches(link, configuration) {
        let baseUrl = new URL(configuration.base_url);
        let linkUrl = new URL(link);

        return linkUrl.host.indexOf(baseUrl.host) === 0;
    }

};

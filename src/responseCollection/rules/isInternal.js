'use strict';

const hosts = require('../../tools/hosts');

module.exports = {

    matches(link, configuration, responseCollection, refererLink) {

        // The link is internal
        if (hosts.equals(link, configuration.base_url)) {
            return true;
        }

        if (configuration.follow_externals) {
            // Follow if the link is external but the referer has the same domain name than the base page
            // Without that check we are going to browser every links on an external page
            if (hosts.equals(refererLink, configuration.base_url)) {
                return true;
            }
        }

        return false;
    }

};

'use strict';

module.exports = {

    matches(link) {
        if (link.endsWith('#')) {
            return false;
        }

        return true;
    }

};

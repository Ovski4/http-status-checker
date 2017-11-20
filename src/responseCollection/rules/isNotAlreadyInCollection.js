'use strict';

module.exports = {

    matches(link, configuration, responseCollection) {
        if (responseCollection.hasResponseWithLink(link)) {
            return false;
        }

        return true;
    }

};

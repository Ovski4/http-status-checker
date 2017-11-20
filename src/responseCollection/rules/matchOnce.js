'use strict';

module.exports = {

    matches(link, configuration, responseCollection) {
        let followOncePatterns = configuration.follow_once_patterns;
        for (let i = 0; i < followOncePatterns.length; i++) {
            let regex = new RegExp(followOncePatterns[i]);
            if (regex.test(link)) {
                if (responseCollection.hasResponseWithLinkThatMatches(followOncePatterns[i])) {
                    return false;
                }
            }
        }

        return true;
    }

};

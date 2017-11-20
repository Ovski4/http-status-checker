'use strict';

module.exports = {

    matches(link, configuration) {
        let neverFollowPatterns = configuration.never_follow_patterns;
        for (let i = 0; i < neverFollowPatterns.length; i++) {
            let regex = new RegExp(neverFollowPatterns[i]);
            if (regex.test(link)) {
                return false;
            }
        }

        return true;
    }

};

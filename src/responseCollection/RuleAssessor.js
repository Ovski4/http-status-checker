'use strict';

const requireDir = require('require-dir');
const rules = requireDir('./rules');

module.exports = class RuleAssessor {

    constructor (configuration, responseCollection) {
        this.configuration = configuration;
        this.responseCollection = responseCollection;
    }

    shouldBeFollowed(link, referer) {
        for (let file in rules) {
            if (rules.hasOwnProperty(file)) {
                if (!rules[file].matches(link, this.configuration, this.responseCollection, referer)) {
                    return false;
                }
            }
        }

        return true;
    }

};

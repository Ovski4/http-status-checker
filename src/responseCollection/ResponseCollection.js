'use strict';

const EventEmitter = require('events');

module.exports = class ResponseCollection extends EventEmitter {

    constructor () {
        super();
        this.responses = [];
    }

    getFailedResponses () {
        return this.responses.filter(response => response.status() > 399);
    }

    hasResponseWithLinkThatMatches (pattern) {
        for (let i = 0; i < this.responses.length; i++) {
            let regex = new RegExp(pattern);
            if (regex.test(this.responses[i].url())) {
                return true;
            }
        }

        return false;
    }

    hasResponseWithLink (link) {
        for (let i = 0; i < this.responses.length; i++) {
            if (link === this.responses[i].url()) {
                return true;
            }
        }

        return false;
    }

    add (response) {
        if (!this.hasResponseWithLink(response.url())) {
            this.responses.push(response);
            this.emit('response_added', response);
        }

        return this;
    }

};
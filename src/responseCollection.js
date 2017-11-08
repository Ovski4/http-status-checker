'use strict';

const EventEmitter = require('events');

module.exports = class ResponseCollection extends EventEmitter {

    constructor () {
        super();
        this.responses = [];
    }

    hasResponse (response) {
        for (let i = 0; i < this.responses.length; i++) {
            if (response.url === this.responses[i].url) {
                return true;
            }
        }

        return false;
    }

    hasResponseWithLink (link) {
        for (let i = 0; i < this.responses.length; i++) {
            if (link === this.responses[i].url) {
                return true;
            }
        }

        return false;
    }

    add (response) {
        if (!this.hasResponse(response)) {
            this.responses.push(response);
            this.emit('response_added', response);
        }
    }

    getLength () {
        return this.responses.length;
    }
};
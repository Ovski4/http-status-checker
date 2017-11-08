'use strict';

module.exports = {
    type: 'object',
    properties: {
        base_url: {
            type: 'string',
        },
        never_follow_patterns: {
            type: 'array',
            default: []
        },
        follow_once_patterns: {
            type: 'array',
            default: []
        },
        extra_links:{
            type: 'array',
            default: []
        },
        login: {
            type: 'object'
        }
    },
    required: ['base_url']
};
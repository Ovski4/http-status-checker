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
            type: 'object',
            properties: {
                url: {
                    type: 'string'
                },
                selector: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        submit_button: {
                            type: 'string'
                        }
                    },
                    required: ['username', 'password', 'submit_button']
                },
                data: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    },
                    required: ['username', 'password']
                }
            },
            required: ['url', 'selector', 'data']
        }
    },
    required: ['base_url']
};

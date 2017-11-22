'use strict';

module.exports = {
    type: 'object',
    properties: {
        base_url: {
            type: 'string',
        },
        follow_externals: {
            type: 'boolean',
            default: false
        },
        never_follow_patterns: {
            type: 'array',
            items: {
                type: 'string'
            },
            default: []
        },
        follow_once_patterns: {
            type: 'array',
            items: {
                type: 'string'
            },
            default: []
        },
        extra_links:{
            type: 'array',
            items: {
                type: 'string'
            },
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
        },
        output_information: {
            type: 'array',
            items: {
                type: 'string'
            },
            default: []
        }
    },
    required: ['base_url']
};

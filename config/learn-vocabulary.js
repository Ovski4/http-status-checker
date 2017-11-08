'use strict';

module.exports = {
    base_url: 'https://learn-vocabulary.com',
    never_follow_patterns: [
        '\/(en|fr)/logout$' // avoid disconnection
    ],
    follow_once_patterns: [
        '\/edition\/[a-z]+-[a-z]+\/[0-9]+\/edit',
        '\/[a-z]+-[a-z]+\/star\/[0-9]+'
    ],
    login: {
        url: '/en/login',
        selector: {
            username: '#username',
            password: '#password',
            submit_button: '#_submit'
        },
        data: {
            username: 'demo',
            password: 'demo'
        }
    }
};

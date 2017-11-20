'use strict';

const parseArguments = require('minimist');

module.exports = {

   process () {
        const ConfigurationException = function (message) {
            this.message = message;
        };

        const args = parseArguments(process.argv.slice(2));

        let configuration;
        if (args._.length === 1) {
            configuration = { base_url: args._[0] };
        } else {
            configuration = require('../' + args.config);
        }

        const Ajv = require('ajv');
        const ajv = new Ajv({useDefaults: true});

        if (!ajv.validate(require('./schema'), configuration)){
            throw new ConfigurationException('Configuration error: ' + JSON.stringify(ajv.errors, null, 2));
        }

        return configuration;
    }
};

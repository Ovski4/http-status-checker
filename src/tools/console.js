'use strict';

module.exports = {

    printResponse(response, configuration) {

        let line = '';
        // Base output
        if (response.status() >= 400) {
            line += '<error>' + response.status() + '</error>: ' + response.url();
        } else  if (response.status() < 300) {
            line += '<info>' + response.status() + '</info>: ' + response.url();
        } else {
            line += '<comment>' + response.status() + '</comment>: ' + response.url();
        }

        const infos = configuration.output_information;
        if (infos.length > 0) {
            for (let i = 0; i < infos.length; i++) {
                line += '\n     - ' + infos[i] + ': <comment>' + response[infos[i]] + '</comment>';
            }
        }

        this.writeln(line);
    },

    writeln (string) {
        let message = string
            .replace(/<info>(.*?)<\/info>/g, '\x1b[32m$1\x1b[0m')
            .replace(/<error>(.*?)<\/error>/g, '\x1b[31m$1\x1b[0m')
            .replace(/<comment>(.*?)<\/comment>/g, '\x1b[34m$1\x1b[0m')
        ;

        console.log(message);
    }
};

'use strict';

module.exports = {

    writeln (string) {
        let message = string
            .replace(/<info>(.*)<\/info>/g, '\x1b[32m$1\x1b[0m')
            .replace(/<error>(.*)<\/error>/g, '\x1b[31m$1\x1b[0m')
            .replace(/<comment>(.*)<\/comment>/g, '\x1b[34m$1\x1b[0m')
        ;

        console.log(message);
    }
};

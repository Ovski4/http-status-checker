'use strict';

const puppeteer          = require('puppeteer');
const parseArguments     = require('minimist');
const output             = require('./src/output');
const schema             = require('./src/schema');
const LinkHelper         = require('./src/linkHelper');
const ResponseCollection = require('./src/responseCollection');

const args = parseArguments(process.argv.slice(2));
let configuration;

if (args._.length === 1) {
    configuration = { base_url: args._[0] };
} else {
    configuration = require(args.config);
}

const Ajv = require('ajv');
const ajv = new Ajv({useDefaults: true});
const valid = ajv.validate(schema, configuration);

console.log(JSON.stringify(configuration, null, 4) + '\n');


const followedOnce = [];

if (!valid){
    console.log(validate.errors);
    return;
}

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const responseCollection = new ResponseCollection();
    const linkHelper = new LinkHelper(configuration.base_url);

    const getLinks = async function () {
        return await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a'));

            return anchors.map(anchor => anchor.getAttribute("href"));
        });
    };

    const shouldBeVisited = function (link) {
        if (linkHelper.isExternal(link)) {
            return false;
        }

        let neverFollowPatterns = configuration.never_follow_patterns;
        for (let i = 0; i < neverFollowPatterns.length; i++) {
            let regex = new RegExp(neverFollowPatterns[i]);
            if (regex.test(link)) {
                return false;
            }
        }

        let followOncePatterns = configuration.follow_once_patterns;
        for (let i = 0; i < followOncePatterns.length; i++) {
            let regex = new RegExp(followOncePatterns[i]);
            if (regex.test(link)) {
                if (followedOnce.includes(followOncePatterns[i])) {
                    return false;
                } else {
                    followedOnce.push(followOncePatterns[i]);
                }
            }
        }

        if (link.endsWith('#')) {
            return false;
        }

        return true;
    };

    const shouldDisplayed = function (link) {
        if (linkHelper.isExternal(link)) {
            return false;
        }

        let neverFollowPatterns = configuration.never_follow_patterns;
        for (let i = 0; i < neverFollowPatterns.length; i++) {
            let regex = new RegExp(neverFollowPatterns[i]);
            if (regex.test(link)) {
                return false;
            }
        }

        if (link.endsWith('#')) {
            return false;
        }

        return true;
    };

    const login = async function () {
        try {
            await page.goto(linkHelper.getFullUrl(configuration.login.url));
            await page.click(configuration.login.selector.username);
            await page.keyboard.type(configuration.login.data.username);
            await page.click(configuration.login.selector.password);
            await page.keyboard.type(configuration.login.data.password);
            await page.click(configuration.login.selector.submit_button);
            await page.waitForNavigation();
        } catch (e) {
            output.writeln('Error on login: <error>' + e.message + '</error>');
        }
    };

    const followLink = async function (link) {
        try {
            await page.goto(link);
            const links = await getLinks();

            for (let i = 0; i < links.length; i++) {
                if (links[i] === null) {
                    continue;
                }

                let fullLink = linkHelper.getFullUrl(links[i]);

                // if the page was not already called
                if (!responseCollection.hasResponseWithLink(fullLink) && shouldBeVisited(fullLink)) {
                    await followLink(fullLink);
                }
            }
        } catch (e) {
            output.writeln('Error following link <info>' + link + '</info>: <error>' + e.message + '</error>');
        }
    };

    page.on('response', response => {
        if (shouldDisplayed(response.url)) {
            responseCollection.add(response);
        }
    });

    responseCollection.on('response_added', (response) => {
        if (response.status >= 400) {
            output.writeln('<error>' + response.status + '</error>: ' + response.url);
        } else  if (response.status < 300) {
            output.writeln('<info>' + response.status + '</info>: ' + response.url);
        } else {
            output.writeln('<comment>' + response.status + '</comment>: ' + response.url);
        }

    });

    if (configuration.login) {
        await login();
    }

    await followLink(configuration.base_url);

    for (let i = 0; i < configuration.extra_links.length; i++) {
        await followLink(linkHelper.getFullUrl(configuration.extra_links[i]));
    }

    await browser.close();
})();

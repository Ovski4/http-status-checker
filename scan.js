'use strict';

const puppeteer          = require('puppeteer');
const { URL }            = require('url');
const output             = require('./src/tools/output');
const configuration      = require('./src/configuration');
const ResponseCollection = require('./src/responseCollection/ResponseCollection');
const RuleAssessor       = require('./src/responseCollection/RuleAssessor');

let config;
try  {
    config = configuration.process();
    console.log('Configuration processed: ' + JSON.stringify(config, null, 4) + '\n');
} catch (e) {
    console.error(e.message);
    process.exit(1);
}

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const responseCollection = new ResponseCollection();
    const ruleAssessor = new RuleAssessor(config, responseCollection);

    const getFullUrl = function (relativeUrl) {
        let url = new URL(relativeUrl, config.base_url);

        return url.href.replace(/(#.*)/, '');
    };

    const getLinks = async function () {
        return await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a'));

            return anchors.map(anchor => anchor.getAttribute("href"));
        });
    };

    const login = async function () {
        try {
            await page.goto(getFullUrl(config.login.url));
            await page.click(config.login.selector.username);
            await page.keyboard.type(config.login.data.username);
            await page.click(config.login.selector.password);
            await page.keyboard.type(config.login.data.password);
            await page.click(config.login.selector.submit_button);
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

                let fullLink = getFullUrl(links[i]);
                // if the link was not already followed
                if (ruleAssessor.shouldBeFollowed(fullLink)) {
                    await followLink(fullLink);
                }
            }
        } catch (e) {
            output.writeln('Error following link <info>' + link + '</info>: <error>' + e.message + '</error>');
        }
    };

    page.on('response', response => {
        if (ruleAssessor.shouldBeFollowed(response.url)) {
            responseCollection.add(response);
        }
    });

    responseCollection.on('response_added', (response) => {
        if (response.status >= 400) {
            output.writeln('<error>' + response.status + '</error>: ' + response.url + ' (link found on page <comment>'+ page.url() + '</comment>)');
        } else  if (response.status < 300) {
            output.writeln('<info>' + response.status + '</info>: ' + response.url);
        } else {
            output.writeln('<comment>' + response.status + '</comment>: ' + response.url);
        }

    });

    if (config.login) {
        await login();
    }

    await followLink(config.base_url);

    for (let i = 0; i < config.extra_links.length; i++) {
        await followLink(getFullUrl(config.extra_links[i]));
    }

    await browser.close();
})();

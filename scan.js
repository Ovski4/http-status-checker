'use strict';

const puppeteer          = require('puppeteer');
const { URL }            = require('url');
const consoleOutput      = require('./src/tools/console');
const linkTool           = require('./src/tools/link');
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

    const getLinks = async function () {
        return await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a'));

            return anchors.map(anchor => anchor.getAttribute("href"));
        });
    };

    const login = async function () {
        try {
            await page.goto(linkTool.getFullUrl(config.login.url, config.base_url));
            await page.click(config.login.selector.username);
            await page.keyboard.type(config.login.data.username);
            await page.click(config.login.selector.password);
            await page.keyboard.type(config.login.data.password);
            await page.click(config.login.selector.submit_button);
            await page.waitForNavigation();
        } catch (e) {
            console.log(e);
            consoleOutput.writeln('Error on login: <error>' + e.message + '</error>');
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

                let fullLink = linkTool.getFullUrl(links[i], link);
                // if the link was not already followed
                if (ruleAssessor.shouldBeFollowed(fullLink, link)) {
                    await followLink(fullLink);
                }
            }
        } catch (e) {
            consoleOutput.writeln('Error following link <info>' + link + '</info>: <error>' + e.message + '</error>');
        }
    };

    page.on('response', response => {
        if (ruleAssessor.shouldBeFollowed(response.url(), page.url())) {
            response.referer = page.url();
            response['content-type'] = response.headers()['content-type'];
            responseCollection.add(response);
        }
    });

    responseCollection.on('response_added', (response) => {
        consoleOutput.printResponse(response, config);
    });

    if (config.login) {
        await login();
    }

    await followLink(config.base_url);

    for (let i = 0; i < config.extra_links.length; i++) {
        await followLink(linkTool.getFullUrl(config.extra_links[i], config.base_url));
    }

    await browser.close();
})();

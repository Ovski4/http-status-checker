HTTP status checker
===================

Check the status code of all resources on a website.

This repository provides a tool to get the HTTP status code of every resources (links, assets such as images, scripts and css files) of a website.
It uses [pupeeter](https://github.com/GoogleChrome/puppeteer) to control Headless Chrome.

Installation
------------

```bash
git clone https://github.com/Ovski4/http-status-checker.git
npm install
```

Usage
-----

```bash
node scan.js http://my-website.com
```

Configuration
-------------

If you want to add specific rules while crawling your website, 
you will need to create a configuration file and run the following command

```bash
node scan.js --config='./path/to/config.js'
```

Wanna try? An example is already ready to be used

```bash
node scan.js --config='./config/learn-vocabulary.js'
```

Have a look at the [example](./config/learn-vocabulary.js). The configuration is self explanatory.

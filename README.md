HTTP status checker
===================

Check the status code of all resources on a website.

This repository provides a tool to get the **HTTP status code** of every resources (links, assets such as images, scripts and css files) of a website.
It uses [pupeeter](https://github.com/GoogleChrome/puppeteer) to control **Headless Chrome**. If you need to test pages behind a **login form**, this tool is very handy. 


- [Installation](#installation)
- [Usage](#usage)
- [Crawling configuration](#crawling-configuration)
- [Output configuration](#output-configuration)

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

You can also test external links by appending the **--follow-externals** option.

Crawling configuration
----------------------

If you want to use specific rules while crawling your website, 
you will need to create a configuration file and run the following command

```bash
node scan.js --config='./path/to/config.js'
```

The minimum requirement for your configuration is the **base_url**.

```js
module.exports = {
    base_url: 'https://example.com'
};
```

You can test external links by setting the **follow_externals** boolean to true.

```js
module.exports = {
    // ...
    follow_externals: true
};
```

If you want to follow extra links (links that will never be found by the crawler such as an admin hidden page), you can use the **extra_links** array.

```js
module.exports = {
    // ...
    extra_links: [
        '/admin3defr673'
    ]
};
```

You may want to never follow some links, you can specify some regular expressions.
Let's say you want to avoid all png files, as well as the logout page to avoid being disconnected. Use the **never_follow_patterns** array.

```js
module.exports = {
    // ...
    never_follow_patterns: [
        '\\.jpg$',
        '\/logout$'
    ]
};
```

Sometimes, you will want to check a link only once, as every other similar links lead to pages with the exact same behaviour. Use the **follow_once_patterns** array.

```js
module.exports = {
    // ...
    follow_once_patterns: [
        '\/list?page=[0-9]+',
    ]
};
```

Eventually, to follow links behind a login page, specify a **login** object with the following properties:

```js
module.exports = {
    // ...
    login: {
        url: '/login',
        selector: {
            username: '#username',
            password: '#password',
            submit_button: '#_submit'
        },
        data: {
            username: 'admin',
            password: 'Hf9hupl0'
        }
    }
};
```

Wanna try? An example is already ready to be used

```bash
node scan.js --config='./config/learn-vocabulary.js'
```

Have a look at the [example](./config/learn-vocabulary.js). The configuration is pretty much self explanatory.
The JSON schema is also [right here](./src/schema.js).

Output configuration
--------------------

You might want to display more information than just the http status code and the link.

You can use the **output_information** array.

```js
module.exports = {
    // ...
    output_information: [
        'referer',
        'content-type'
    ]
};
```

* If set, the **referer** will display the page link on which the link was found. It can be useful to find where a **dead link** is.
* If set, the **content-type** will display the value of the content-type header of the page link.
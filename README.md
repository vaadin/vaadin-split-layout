# &lt;vaadin-split-layout&gt;

[Live Demo ↗](https://vaadin.com/components/vaadin-split-layout/html-examples)
|
[API documentation ↗](https://vaadin.com/components/vaadin-split-layout/html-api)

[&lt;vaadin-split-layout&gt;](https://vaadin.com/components/vaadin-split-layout) is a Web Component implementing a split layout for two content elements with a draggable splitter between them, part of the [Vaadin components](https://vaadin.com/components).

[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-split-layout)](https://www.npmjs.com/package/@vaadin/vaadin-split-layout)
[![Build status](https://travis-ci.org/vaadin/vaadin-split-layout.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-split-layout)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-split-layout)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-split-layout)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/vaadinvaadin-split-layout.svg)](https://vaadin.com/directory/component/vaadinvaadin-split-layout)
[![Discord](https://img.shields.io/discord/732335336448852018?label=discord)](https://discord.gg/PHmkCKC)

```html
<vaadin-split-layout>
  <vaadin-split-layout orientation="vertical">
    <div>First layout content</div>
    <div>Second layout content</div>
  </vaadin-split-layout>
  <vaadin-split-layout orientation="vertical">
    <div>Third layout content</div>
    <div>Fourth layout content</div>
  </vaadin-split-layout>
</vaadin-split-layout>
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-split-layout/master/screenshot.png" width="616" alt="Screenshot of vaadin-split-layout">](https://vaadin.com/components/vaadin-split-layout)

## Installation

Install `vaadin-split-layout`:

```sh
npm i @vaadin/vaadin-split-layout --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-split-layout/vaadin-split-layout.js';
```

## Getting started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The component with the Lumo theme:

  `theme/lumo/vaadin-split-layout.js`

- The component with the Material theme:

  `theme/material/vaadin-split-layout.js`

- Alias for `theme/lumo/vaadin-split-layout.js`:

  `vaadin-split-layout.js`


## Running API docs and tests in a browser

1. Fork the `vaadin-split-layout` repository and clone it locally.

1. Make sure you have [node.js](https://nodejs.org/) 12.x installed.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vaadin-split-layout` directory, run `npm install` to install dependencies.

1. Run `npm start`, browser will automatically open the component API documentation.

1. You can also open visual tests, for example:

  - http://127.0.0.1:3000/test/visual/default.html


## Running tests from the command line

1. When in the `vaadin-split-layout` directory, run `npm test`

## Debugging tests in the browser

1. Run `npm run debug`, then choose manual mode (M) and open the link in browser.


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.js` files.


## Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com).


## Contributing

  To contribute to the component, please read [the guideline](https://github.com/vaadin/vaadin-core/blob/master/CONTRIBUTING.md) first.


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.

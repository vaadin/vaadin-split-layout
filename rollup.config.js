const { createDefaultConfig } = require('@open-wc/building-rollup');

module.exports = createDefaultConfig({
  input: './index.html',
  indexHTMLPlugin: {
    minify: false
  }
});

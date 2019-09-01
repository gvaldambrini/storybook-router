const path = require('path')

module.exports = async ({config}) => {
  config.module.rules.forEach(r => {
    r.include = [path.join(__dirname,'../../..') ];
    r.exclude = [/node_modules/];
  });

  return config;
};

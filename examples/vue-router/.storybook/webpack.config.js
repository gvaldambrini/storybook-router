const path = require('path')

module.exports = async ({config}) => {
  config.module.rules.forEach(r => {
    r.includes = [path.join(__dirname,'../../..') ];
    r.excludes = [/node_modules/];
  });

  return config;
};

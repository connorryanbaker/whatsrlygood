'use strict'

const fs = require('fs');
const program = require('commander');
const request = require('request');
const pkg = require('./package.json');
const parse = require('./lib/body_parse.js');
const paginate = require('./lib/paginate.js');
require('dotenv').config();


program
  .version(pkg.version)
  .description(pkg.description)
  .option('-n, --nofox', 'eliminate Fox News from output');

program
  .command('top')
  .description('paginates a collection of 20 top news headlines')
  .action(() => {
    const url = 'https://newsapi.org/v2/top-headlines?' + 
      'country=us&' + `apiKey=${process.env.API_KEY}`;
    const options = {
      url,
      method: 'GET',
    };

    request(options, (err, res, body) => {
      if (err) {
        console.log('Error: ', err);
        return;
      }
      const parsed = parse(body, program.nofox);
      const stories = Object.values(parsed);

      paginate(stories);
    });
  });

program.parse(process.argv);

if (!program.args.filter(arg => typeof arg == 'object').length) {
  program.help();
}

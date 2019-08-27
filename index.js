'use strict'

const fs = require('fs');
const program = require('commander');
const request = require('request');
const pkg = require('./package.json');
const parse = require('./lib/body_parse.js');
const paginate = require('./lib/paginate.js');
require('dotenv').config();

function displayStories(payload) {
  const parsed = parse(payload, program.nofox);
  const stories = Object.values(parsed);
  return paginate(stories);
}

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
      return displayStories(body);
    });
  });

program
  .command('source <source>')
  .description('paginates a collection of headlines from specified source')
  .action((source) => {
    const url = 'https://newsapi.org/v2/top-headlines?' +
      `sources=${source}&` + `apiKey=${process.env.API_KEY}`;
    const options = {
      url,
      method: 'GET',
    };

    request(options, (err, res, body) => {
      if (err) {
        console.log('Error: ', err);
        return;
      }
      return displayStories(body);
    });
  });

program
  .command('about <about>')
  .description('paginates a collection of headlines about specified topic')
  .action((about) => {
    const date = new Date();
    const ymd = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const url = 'https://newsapi.org/v2/everything?' + `q=${about}&from=${ymd}&sortBy=popularity&apiKey=${process.env.API_KEY}`;
    const options = {
      url,
      method: 'GET',
    };

    request(options, (err, res, body) => {
      if (err) {
        console.log('Error: ', err);
        return;
      };
      return displayStories(body);
    });
  });

program.parse(process.argv);

if (!program.args.filter(arg => typeof arg == 'object').length) {
  program.help();
}

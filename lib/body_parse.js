'use strict';

module.exports = function(body, noFox) {
  const parsed = {};
  const articles = JSON.parse(body).articles;
  for (let i = 0; i < articles.length; i++) {
    let article = articles[i];
    if (noFox && article.source.name === 'Fox News') continue;
    let miniArticle = {
      source: article.source.name,
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
    };

    parsed[i + 1] = miniArticle;
  }
  return parsed;
};

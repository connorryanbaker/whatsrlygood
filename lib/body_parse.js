'use strict';

module.exports = function(body) {
  const parsed = {};
  JSON.parse(body).articles.forEach((article, idx) => {
    let miniArticle = {
      source: article.source.name,
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
    };
    parsed[idx + 1] = miniArticle;
  });
  return parsed;
};

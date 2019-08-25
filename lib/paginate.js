const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function paginate(stories, idx = 0) {
  const story = stories[idx];
  const str = story ? 'Source: ' + story.source + '\n' +
    'Title' + story.title + '\n' : '';
  rl.question(str, res => {
    if (idx + 1 >= stories.length) return rl.close();
    return paginate(stories, idx + 1);
  });
}

module.exports = paginate;
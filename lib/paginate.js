const open = require('open');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function paginate(stories, idx = 0) {
  const story = stories[idx];
  const str = 'Source: ' + story.source + '\n' +
    'Title: ' + story.title + '\n' + story.description + '\n' + 
    'Press o to launch browser or any key for the next story: ';
  rl.question(str, res => {
    if (idx + 1 >= stories.length) return rl.close();
    if (res === 'o') {
      open(story.url);
      return rl.close();
    }
    return paginate(stories, idx + 1);
  });
}

module.exports = paginate;
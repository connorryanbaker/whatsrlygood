const open = require('open');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function paginate(stories, idx = 0) {
  console.clear();
  if (!stories.length) return rl.close();
  const story = stories[idx];
  const str = 'Source: ' + story.source + '\n' +
    story.title + '\n\n' + story.description + '\n\n' + 
    'Enter o to open story in new browser tap or any key for the next story: ';
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
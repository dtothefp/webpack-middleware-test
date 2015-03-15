var download = require('bundle?lazy&name=download!./download');
var chat = require('bundle?lazy&name=chat!./chat');
var home = require('./home');
var question = require('bundle?lazy&name=question!./question');

function loadAsync(fn) {
  return function(ctx) {
    fn(function(file) {
      file(ctx);
    });
  }
}

module.exports = {
  chat: loadAsync(chat),
  download: loadAsync(download),
  home: home,
  question: loadAsync(question)
};

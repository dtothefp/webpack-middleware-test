require('./index.scss');

var debug = require('debug')('webclient:index');
var page = require('page');
var views = require('./views');

if(module.hot) {
  module.hot.accept('./views', function() {
    views = require('./views');
  });
}

// start rounter

debug('start router');
page('/', views.home);
page('/download', views.download);
page('/c/:id/:token', views.chat);
page('/:key', views.question);
page.start({ hashbang: true });

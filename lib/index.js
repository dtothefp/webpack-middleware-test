require('./index.scss');

var debug = require('debug')('webclient:index');
var query = require('component-query');
var page = require('page');
var views = require('./views');
var check = query('button.check');
var apply = query('button.apply');
if(module.hot) {

  Array.prototype.slice.call(query.all('button')).forEach(function(button) {
    addEventListener('click', function(event) {
      var btnClass = event.target.classList[0];
      var updateElm = query('span.' + btnClass);
      switch(btnClass) {
        case 'apply':

          try {
            module.hot.apply(function(err, renewedModules) {
              if(err) {
               return updateElm.innerHTML = (err.toString());
              }
              if(renewedModules) {
               updateElm.innerHTML = ("Renewed modules: " + renewedModules.join(", "));
              }
            });
          } catch(e) {
            updateElm.innerHTML = (e.toString());
          }

          break;
        case 'check':

          try {
            module.hot.check(function(err, updatedModules) {
              if(err) {
               return updateElm.innerHTML = (err.toString());
              }
              if(updatedModules) {
               updateElm.innerHTML = ("Updated modules: " + updatedModules.join(", "));
              }
            });
          } catch(e) {
            updateElm.innerHTML = (e.toString());
          }

          break;
      }
    });
  })

  module.hot.accept('./views', function() {
    views = require('./views');
  });

  //query('span.status').innerHTML = module.hot.status();

  module.hot.status(function(newStatus, oldStatus) {
    query('span.status').innerHTML = newStatus;
  });
}

// start rounter

debug('start router');
page('/', views.home);
page('/download', views.download);
page('/c/:id/:token', views.chat);
page('/:key', views.question);
page.start({ hashbang: true });

var debug = require('debug')('webclient:download');
var template = require('../templates/download.html');
var query = require('component-query');

// download link

module.exports = function render() {
  debug('start render');
  query('.wrapper').innerHTML = template({title: 'Download Template'});
  debug('end render');
};

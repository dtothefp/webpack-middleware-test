var debug = require('debug')('webclient:home');
var query = require('component-query');
var template = require('../templates/home.html');

exports = module.exports = render;
exports.subscribe = subscribe;

function render(ctx) {
  debug('start render');
  query('.wrapper').innerHTML = template({title: 'Home Template'});
  debug('end render');
}

function subscribe(hasWelcome, email) {
  debug('start render thanks');
  debug('end render thanks');
}

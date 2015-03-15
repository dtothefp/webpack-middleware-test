var debug = require('debug')('webclient:chat');
var query = require('component-query');
var template = require('../templates/chat.html');
var notfound = require('./question').notfound;

module.exports = function render(req) {
  var token = req.params.token;
  var id = req.params.id;
  debug('connect with %s', token);
  query('.wrapper').innerHTML = template({
    title: 'Chat Template',
    id: id,
    token: token
  });
  debug('get %s', '/api/messages/' + id);
};

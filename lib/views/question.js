var debug = require('debug')('webclient:question');
var query = require('component-query');
var template = require('../templates/question.html');
var subscribe = require('./home').subscribe;

exports = module.exports = init;

function init(req) {
  debug('init');
  query('.wrapper').innerHTML = template({
    title: 'Question Template',
    key: req.params.key
  });
}

var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

require('./router.js');



$(function(){
  Backbone.history.start();
});

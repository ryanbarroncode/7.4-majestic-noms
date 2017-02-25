var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var FoodContainer = require('./components/index.jsx').FoodContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    ReactDOM.render(
      React.createElement(FoodContainer),
      document.getElementById('app')
    )
  },
});

var appRouter = new AppRouter();

module.exports = {
  appRouter
};

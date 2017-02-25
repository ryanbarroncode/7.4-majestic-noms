var Backbone = require('backbone');

var Food = Backbone.Model.extend({
  idAttribute: '_id',
});

var OrderCollection = Backbone.Collection.extend({
  model: Food,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/ryanbarroncodepizza',
  subTotal: function(){

    var subTotal = this.reduce(function(accum, i){
      return accum + i.get('price');
    },0);

    return subTotal.toFixed(0);
  }
});

var FoodCollection = Backbone.Collection.extend({
  model: Food,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/ryanbarroncodepizza'
});



module.exports = {
  Food,
  FoodCollection,
  OrderCollection
};

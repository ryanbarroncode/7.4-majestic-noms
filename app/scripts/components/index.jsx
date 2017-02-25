var React = require('react');

var FoodCollection = require('../models/models').FoodCollection;
var OrderCollection = require('../models/models').OrderCollection;

var FoodContainer = React.createClass({

  getInitialState: function(){
    var foodCollection = new FoodCollection();
    var orderCollection = new OrderCollection();
    return {
      foodCollection: foodCollection,
      orderCollection: orderCollection
    };
  },
  componentWillMount: function(){
    var newFoodCollection = this.state.foodCollection;
    newFoodCollection.add([
      {foodItem: 'Pizza', description: 'Description :: Bread with melted cheese and other food on top', price: 10.00},
      {foodItem: 'Sub Sandwich', description: 'Description :: Two pieces of bread with other food in the middle', price: 5.00},
      {foodItem: 'Drink', description: 'Description :: Cardboard cup with sugary carbonated beverage of your choice', price: 1.95},
      {foodItem: 'Calzone', description: 'Description :: Ball of bread with pizza inside', price: 8.00},
      {foodItem: 'Panaeng', description: 'Pork, Chicken or Beef.', price: 8.59},
    ]);
    this.setState({foodCollection: newFoodCollection});
    console.log(newFoodCollection);
  },
  addOrderItem: function(foodProps){
    this.state.orderCollection.add(foodProps.toJSON());
    this.forceUpdate();
  },

render: function(){
  return(
    <div className="container-fluid">
      <div className="row">

        <div className="col-xs-12">
          <nav className="navbar navtop navbar-default">
              <div className="navbar-header">
                <h1 className="restaurant-name"> Pizzeria Mama Mia </h1>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">My Offers</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Sign In</a></li>
                </ul>
              </div>
            </nav>


            <div className="row">
          <div className="col-xs-12">
            <div className="jumbotron">
              <h1 classname="acheivement">Pizzeria Mama Mia!</h1>

              <div>
                <p>715 Church Street Central SC, 29630</p>
              </div>

              <div className="">
                <p>American Pizza, American</p>
                <p>placeholder  stars</p>
              </div>

              <p><a className="btn btn-primary btn-lg" href="http://yelp.com" role="button">Show Yelp Reviews</a></p>

              <span className="infobar"> Closed </span>
              <span className="infobar"> Delivery Est: 30-45 Min </span>
              <span className="infobar"> Delivery Min: None </span>
              <span className="infobar"> $5.00 </span>

              <div className="row">
                <div className="btn-group menu-btn-group" role="group" aria-label="...">
                    <button type="button" className="btn menu-btn btn-default">Menu</button>
                    <button type="button" className="btn menu-btn btn-default">Hours and Info</button>
                    <button type="button" className="btn menu-btn btn-default">Reviews  (162)</button>
                  </div>
              </div>
            </div>
          </div>
        </div>

            <div className="col-xs-8 menu-window ">
              <FoodForm addOrderItem={this.addOrderItem} foodCollection={this.state.foodCollection} />
            </div>
            <div className="col-xs-4 order-window well">
              <OrderForm orderCollection={this.state.orderCollection}/>
            </div>
        </div>
      </div>
    </div>
  );
}
});

var FoodForm = React.createClass({

  render: function(){
    var self = this;
    var foodListings = this.props.foodCollection.map(function(foodProps){
      return (
        <div key={foodProps.cid}>
          <br></br>
          <span className="item-listing"> {foodProps.get('foodItem')} </span>
            <ul className="item-price well">
              <li> Price </li>
              <li className="">{foodProps.get('price')}</li>
                <p className="item-description"> {foodProps.get('description')}</p>
            </ul>
            <button type="button" className="btn btn-default btn-xs" onClick={() => {self.props.addOrderItem(foodProps)}}>Add To Order</button>


        </div>
      );
    });

    return (
      <div>
        {foodListings}
      </div>
    );
  }
});


var OrderForm = React.createClass({

  placeOrder: function(){

    var subTotal = this.props.orderCollection.subTotal();

    var items = this.props.orderCollection.map(function(item){
      var title = item.get('foodItem');
      var price = item.get('price');

      return {
        title,
        price
      }
    });

    this.props.orderCollection.create({username:'Ryan', subTotal: subTotal, items: items})
    this.props.orderCollection.reset();
    this.forceUpdate();



    // this.props.orderCollection
  },

  render: function(){
    // var self = this;
    // this.props.orderCollection.fetch().done(function(){
    //   console.log(self.props.orderCollection);
    // });

    var subTotal = this.props.orderCollection.subTotal();

    var orderItems = this.props.orderCollection.map(function(orderItem){

      return (
        <li key={orderItem.cid}>
          <span>{orderItem.get('foodItem')}</span>
          <span className="order-item-price"> {orderItem.get('price')} </span>
        </li>
      )
    });

    return(
      <div>
        <span> Your Order </span>
          <ul>
            {orderItems}
          </ul>
          <p> Subtotal: ${subTotal} </p>
        <button onClick={this.placeOrder} type="submit" id="place-order-btn" className="btn btn-secondary btn-sm">Place Order</button>
      </div>
    );
  }
});


module.exports = {
  FoodContainer
};

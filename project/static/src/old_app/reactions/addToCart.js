import $ from 'jquery';
import { store } from '../stores';
import { autorun, toJS } from 'mobx';
import _ from 'underscore';
import { getIdByAttr } from '../utils';


$('.property').on('click', function(e) {
  const prodId = getIdByAttr(e.target, 'productId');
  const propId = getIdByAttr(e.target, 'propertyId');
  const product = store.products.find(prod => prod.id === prodId);
  product.setActiveProperty(propId);
});



$('.add-to-cart').on('click', function(e) {
  const productId = getIdByAttr(e.target, 'productId');
  store.addCartItem(productId);
});

const renderIncrementButtons = (prodId) => {
  const cartItem = store.cartitems.find(i => i.product === prodId);
  return `<div class="add-to-cart">
    <i class="ion-ios-minus" />
    <span class="count">${cartItem.count}</span>
    <i class="ion-ios-plus" />
  </div>`;
}

autorun(() => {
  _.each(store.properties, (p) => {
    if (p.isActive) {
      $(`#price-product-${p.id}`).html(`${p.price}р.`);
    }
  });
});


autorun(() => {
  const cartitemsArray = store.cartitems.map(i => i.product);
  _.each(store.products, (prod) => {
    if (cartitemsArray.includes(prod.id)) {
      console.log('includes prop');
      $(`#add-to-cart-container-${prod.id}`).html(renderIncrementButtons(prod.id));
    }
  });
});

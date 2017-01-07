import { store } from '../stores';


export const productButtons = (prodId, cartitemId) => {
  const cartItem = store.cartitems.find(i => i.id === cartitemId);
  const component = $(`<div class="add-to-cart">
    <span class="count">${cartItem.count}</span>
  </div>`);
  $(component).prepend(decrementButton(prodId));
  $(component).append(incrementButton(prodId));
  return component;
};

const decrementButton = (prodId) => {
  const button = $(`<i class="ion-ios-minus"/>`);
  $(button).on('click', function(e) {
    store.removeCartItem(prodId);
  });
  return button;
};

const incrementButton = (prodId) => {
  const button = $(`<i class="ion-ios-plus"/>`);
  $(button).on('click', function(e) {
    store.addCartItem(prodId);
  });
  return button;
};


//solidProductButton
export const solidProductButton = (prodId) => {
  const component = $(`<div
    class="add-to-cart"
    id="add-to-cart-product-${prodId}"
    productId="${prodId}">
    <img
      productId="${prodId}"
      width="22"
      src="/static/src/img/shopping-bag-4.png"
      srcset="/static/src/img/shopping-bag-4.png 1x,
        /static/src/img/shopping-bag-4@2x.png 2x,
        /static/src/img/shopping-bag-4@3x.png 3x" />
    <span productId="${prodId}">Добавить в корзину</span>
  </div>`);
  $(component).on('click', function(e) {
    store.addCartItem(prodId);
  });
  return component;
}


// Компонент блока кнопок properties
export const productProperties = (product, properties) => {
  const container = $(`<div id="properties-product-${product.id}"></div>`);
  const buttons = properties.map(prop => propertyButton(product, prop));
  $(container).append(buttons);
  return container;
};

const propertyButton = (product, prop) => {
  const button = $(`<button
      id="property-${prop.id}"
      class="property btn btn-mini btn-success ${prop.isActive ? 'active' : ''}">
        ${prop.value} ${prop.type ? prop.type.unit: ''}
    </button>`);
    $(button).on('click', function() {
      product.setActiveProperty(prop.id);
    });
  return button;
};
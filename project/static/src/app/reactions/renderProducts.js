import { productButtons, solidProductButton, productProperties } from '../components';

// function for render properties
export const renderButtons = (productId, activeCartitem) => {
  if (activeCartitem) {
    // render buttons
    $(`#add-to-cart-container-${productId} .add-to-cart`).replaceWith(productButtons(productId, activeCartitem.id));
  }
  else {
    // render solid buttons
    $(`#add-to-cart-container-${productId} .add-to-cart`).replaceWith(solidProductButton(productId));
  }
}


// function for render price
export const renderPrice = (productId, activeProperty) => {
  // render price
  if (activeProperty) {
    $(`#price-product-${productId}`).html(`${activeProperty.price}р.`);
  }
}

// function for render price
export const renderProperties = (product, properties) => {
  // render price
  if (properties.length !== 0) {
    $(`#properties-product-${product.id}`).replaceWith(productProperties(product, properties));
  }
}
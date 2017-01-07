// @flow
import React from 'react';
import { render } from 'react-dom';
import { Store, uiStore } from './store';
import Cart from './Cart';
import App from './App';
import ProductList from './ProductList';
import PriceSlider from './PriceSlider';


const store = new Store();

render(
  <Cart store={store} />,
  document.getElementById('cart')
);


// render(
//   <App store={store} uiStore={uiStore}/>,
//   document.getElementById('app'),
// );

render(
  <ProductList store={store} uiStore={uiStore} />,
  document.getElementById('react-product-list'),
);

render(
  <PriceSlider store={store} uiStore={uiStore} />,
  document.getElementById('react-price-slider'),
);

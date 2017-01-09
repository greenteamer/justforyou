// @flow
import React from 'react';
import { render } from 'react-dom';
import { store, uiStore } from './store';
import Cart from './Cart';
import { ProductList } from './containers';
import PriceSlider from './PriceSlider';


render(
  <Cart store={store} />,
  document.getElementById('cart')
);

render(
  <ProductList store={store} uiStore={uiStore} />,
  document.getElementById('react-product-list'),
);

render(
  <PriceSlider store={store} uiStore={uiStore} />,
  document.getElementById('react-price-slider'),
);

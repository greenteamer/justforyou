// @flow
import React from 'react';
import { render } from 'react-dom';
import { store, uiStore } from './store';
import Cart from './Cart';
import { ProductList, ProductCard } from './containers';
import PriceSlider from './PriceSlider';


renderApp(
  <Cart store={store} />,
  document.getElementById('cart')
);


renderApp(
  <ProductList store={store} uiStore={uiStore} />,
  document.getElementById('react-product-list'),
);


renderApp(
  <PriceSlider store={store} uiStore={uiStore} />,
  document.getElementById('react-price-slider'),
);


renderApp(
  <ProductCard store={store} uiStore={uiStore} />,
  document.getElementById('react-product-card')
);



function renderApp(component, domElement) {
  if (component && domElement) {
    render(
      component,
      domElement,
    );
  }
}

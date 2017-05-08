// @flow
import React from 'react';
import { render } from 'react-dom';
import { store, uiStore } from './store';
import Cart from './Cart';
import CartPage from './CartPage';
import { ProductList, ProductCard, AttachedProducts } from './containers';
import PriceSlider from './PriceSlider';
import Loader from './components/Loader';


renderApp(
  <Cart store={store} />,
  document.getElementById('cart'),
);


renderApp(
  <CartPage store={store} />,
  document.getElementById('cart-page'),
);

// renderApp(
//   <Order store={store} uiStore={uiStore} />,
//   document.getElementById('order-page'),
// );


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

renderApp(
  <AttachedProducts store={store} uiStore={uiStore} />,
  document.getElementById('react-attached-products')
);

renderApp(
  <Loader store={store} />,
  document.getElementById('react-loader')
);

function renderApp(component, domElement) {
  if (component && domElement) {
    render(
      component,
      domElement,
    );
  }
}

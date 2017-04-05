import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ProductCardComponent } from '../components/products';


@observer
class ProductCard extends Component {

  static propTypes = {
    store: PropTypes.object,
    uiStore: PropTypes.object,
  }

  render() {
    const { store } = this.props;
    const arr = window.location.pathname.split('/');
    const slug = arr[arr.length - 2];
    if (store.products.length === 0) {
      return null;
    }
    const product = store.products.find(p => p.slug === slug);
    return <ProductCardComponent product={product} store={store} />;
  }
}


export default ProductCard;

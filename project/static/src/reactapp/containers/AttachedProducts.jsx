import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Product, ProductMenu } from '../components/products';
import { toJS } from 'mobx';


@observer
class AttachedProducts extends Component {

  static propTypes = {
    store: PropTypes.object,
    uiStore: PropTypes.object,
  }

  render() {
    const { store, uiStore } = this.props;
    const arr = window.location.pathname.split('/');
    const slug = arr[arr.length - 2];
    if (store.products.length === 0) {
      return null;
    }
    const product = store.products.find(p => p.slug === slug);
    return <div className="flex flex-wrap">
      {product.attachedProducts.length > 0
        && product.attachedProducts
          .map((product, index) => <div key={index} className="w-50 pa-10px">
            <Product product={product} store={store} />
          </div>)
        || <h3>No products</h3>
      }
    </div>;
  }
}


export default AttachedProducts;

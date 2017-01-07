import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Product } from './components/products';


@observer
class ProductList extends Component {

  static propTypes = {
    store: PropTypes.object,
    uiStore: PropTypes.object,
  }

  render() {
    const { store, uiStore } = this.props;
    if (uiStore.isLoading) return <h1>...Loading</h1>;
    return <div className="row">
      <div className="col-md-12">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary">Left</button>
          <button type="button" className="btn btn-secondary">Middle</button>
          <button type="button" className="btn btn-secondary">Right</button>
        </div>
      </div>
      {store.filterProductsByPrice.length > 0
        && store.filterProductsByPrice
          .map((product, index) => <Product key={index} product={product} store={store} />)
        || <h1>No products in this category</h1>
      }
    </div>;
  }
}

export default ProductList;

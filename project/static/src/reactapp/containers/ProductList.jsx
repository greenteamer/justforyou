import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Product, ProductMenu } from '../components/products';
import { toJS } from 'mobx';


@observer
class ProductList extends Component {

  static propTypes = {
    store: PropTypes.object,
    uiStore: PropTypes.object,
  }

  render() {
    const { store, uiStore } = this.props;
    console.log('ProductList sortedProducts: ', store.sortedProducts);
    return <div className="row">
      <div className="col-md-12 mb-15px">
        <ProductMenu uiStore={uiStore} store={store}/>
      </div>
      {store.sortedProducts.length > 0
        && store.sortedProducts
          .map((product, index) => <div key={index} className="col-xs-6 col-md-3">
            <Product product={product} store={store} />
          </div>)
        || <h1>No products in this category</h1>
      }
    </div>;
  }
}


export default ProductList;

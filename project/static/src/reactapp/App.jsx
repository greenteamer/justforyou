import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Product } from './components/products';


@observer
class CatalogLink extends Component {
  static propTypes = {
    category: PropTypes.object,
    uiStore: PropTypes.object,
  }

  changeFilter = () => {
    const { category, uiStore } = this.props;
    uiStore.setCatalogFilter(category.id);
  }

  render() {
    const { category } = this.props;
    return <li onClick={this.changeFilter}><span className="link">{category.name}</span></li>;
  }
}


@observer
class App extends Component {

  static propTypes = {
    store: PropTypes.object,
    uiStore: PropTypes.object,
  }

  render() {
    const { store, uiStore } = this.props;
    if (uiStore.isLoading) return <h1>...Loading</h1>;
    return <div className="row">
      <div className="col-md-3">
        <div className="catalog sidebar">
          <h4>Каталог</h4>
          <ul className="catalog-list">
            {store.categories.map((category, index) => <CatalogLink key={index} category={category} uiStore={uiStore} />)}
          </ul>
        </div>
      </div>
      <div className="col-md-9">
        <div className="row">
          {store.productsByCategory.length > 0
            && store.productsByCategory
              .map((product, index) => <Product key={index} product={product} store={store} />)
            || <h1>No products in this category</h1>
          }
        </div>
      </div>
    </div>;
  }
}

export default App;

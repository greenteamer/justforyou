import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
// import { Product } from './components/products';
// import * as API from './api';


@observer
class App extends Component {

  static propTypes = {
    store: PropTypes.object,
    uiStore: PropTypes.object,
  }

  render() {
    const { uiStore } = this.props;
    if (uiStore.isLoading) return <h1>...Loading</h1>;
    return <div className="row">
      <div className="col-md-12">
        <div className="col-sm-6">
          <h4>Ваши контактные данные</h4>
          <div className="form-group mb0">
            <label htmlFor="example-text-input" className="col-form-label">Телефон</label>
            <input
              className="form-control"
              type="tel"
              placeholder="Телефон"
              id="example-text-input"/>
          </div>
          <div className="form-group mb0">
            <label htmlFor="example-text-input" className="col-form-label">email</label>
            <input
              className="form-control"
              type="search"
              placeholder="email"
              id="example-search-input"/>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default App;

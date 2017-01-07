// @flow
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
class App extends Component {
  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props;
    return <li id="fat-menu" className="dropdown">
      <i className="ion-ios-cart cart-icon"><span className="badge">{store.totalItems}</span></i>
      <div className="price-block">
        <p>Сумма:</p>
        <p className="price">{store.totalPrice} р.</p>
      </div>
    </li>;
  }
}

export default App;

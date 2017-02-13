// @flow
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
class CartPage extends Component {
  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    // const { store } = this.props;
    return <div>
      <h1>
        Ваша корзина
      </h1>
      <div className="col-md-12">

      </div>
    </div>;
  }
}

export default CartPage;

// @flow
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { AddButton, RemoveButton } from './components/products';


@observer
class Incrementer extends Component {
  static propTypes = {
    item: PropTypes.object,
  }

  render() {
    const { item } = this.props;
    return <div className="bg-green h-100 c-white pa-8px tc pointer flex justify-center items-center min-h-50px">
      <RemoveButton decrement={ item.count > 1 ? item.decrement : () => {}}/>
      <span className="count fs-120r pl-10px pr-10px">{ item.count }</span>
      <AddButton increment={ item.increment }/>
    </div>;
  }
}



@observer
class CartItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
  }
  render() {
    const { item } = this.props;
    // if (!item.propertyObj || !item.productObj) return null;
    return <div className="col-md-12 ph-20px bb bd-white">
      <div className="row">
        <div className="col-md-4 bg-light-gray flex items-center justify-center"><div className="pa2 fs-100r b tc">{ item.productObj.name }</div></div>
        <div className="col-md-2 bg-light-gray flex justify-center">
          {item.propertyObj &&
            <div className="pa2 flex items-center justify-center">{ item.propertyObj.value } гр.</div>
          }
        </div>
        <div className="col-md-2 b bg-light-gray flex justify-center">
          <div className="pa2 fs-100r flex items-center justify-center">{ item.totalPrice } р.</div>
        </div>
        <div className="col-md-3 bg-green">
          <Incrementer item={ item } />
        </div>
        <div
          className="col-md-1 pointer bg-red flex items-center justify-center btn-shadow"
          onClick={item.remove}
        >
          <spanon onClick={item.remove} className="ion-ios-close-empty pointer c-white fs-220r" />
        </div>
      </div>
    </div>;
  }
}


@observer
class CartPage extends Component {
  static propTypes = {
    store: PropTypes.object,
  }

  render() {
    const { store } = this.props;
    // console.log('store userCartitems: ', store.userCartitems);
    return <div className="col-md-12">
      <div className="row">
        <div className="col-md-12">
          <h1>
            Ваша корзина
          </h1>
        </div>
        <div className="col-md-9">
          <div className="row">
            {store.userCartitems.length !== 0 &&
                store.userCartitems.map((c, index) => <CartItem key={index} item={c}/>) ||
                <div className="col-md-12">
                  <h3>
                    Ваша корзина пуста
                  </h3>
                </div>
            }
          </div>
        </div>
      </div>
    </div>;
  }
}

export default CartPage;

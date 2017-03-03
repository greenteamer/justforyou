import React, { Component, PropTypes } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { AddButton, RemoveButton } from './components/products';
import { tooltipFn } from './utils';
import Select from 'react-select';
import * as API from './api';


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
        <div {...tooltipFn('Наименование')} className="col-md-3 bg-light-gray flex items-center justify-center"><div className="pa2 fs-100r b tc">{ item.productObj.name }</div></div>
        <div {...tooltipFn('Свойства')} className="col-md-2 bg-light-gray flex justify-center">
          {item.propertyObj &&
            <div className="pa2 flex items-center justify-center">{ item.propertyObj.value } гр.</div>
          }
        </div>
        <div {...tooltipFn('Цена')} className="col-md-2 b bg-light-gray flex justify-center">
          <div className="pa2 fs-100r flex items-center justify-center">{ item.productObj.price } р.</div>
        </div>
        <div className="col-md-2 bg-green">
          <Incrementer item={ item } />
        </div>
        <div {...tooltipFn('Стоимость')} className="col-md-2 b bg-light-gray flex justify-center">
          <div
            className="pa2 fs-100r flex items-center justify-center"
          >{ item.totalPrice } р.</div>
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
  @observable cityArray = [];

  static propTypes = {
    store: PropTypes.object,
  }

  handleChangeAddress = (value, callback) => {
    // console.log('Selected: ', val);
    const self = this;
    if (value.length > 4) {
      API.suggestion(API.ENDPOINTS.GET_SUGGEST_ADDRESS_BY_IP())
        .then(
          result => {
            console.log('response result ip: ', result);
            const data = {
              query: value,
              locations_boost: [{
                kladr_id: result.location.data.kladr_id,
              }],
            };
            API.suggestion(API.ENDPOINTS.GET_SUGGEST_ADDRESS(), data)
              .then(
                result => {
                  console.log('response result address: ', result);
                  // self.cityArray.replace(result.suggestions);
                  setTimeout(() => {
                    const options = result.suggestions.map((city, index) => {
                      return {value: index, label: city.unrestricted_value};
                    });
                    callback(null, {
                      options: options,
                      // CAREFUL! Only set this to true when there are no more options,
                      // or more specific queries will not be sent to the server.
                      complete: false,
                    });
                  }, 1000);
                },
                error => console.log('response error address: ', error),
              );
          },
          error => console.log('response error ip: ', error),
        );
    }
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
        <div className="col-md-12">
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
        <div className="col-md-12 tr mt3">
          <p className="b fs-140r">
            <span className="fs-100r">Общая стоимость товаров: </span> {store.totalPrice} р.
          </p>
        </div>
        <div className="col-md-12">
          <h3 className="mt3">
            Расчитать доставку:
          </h3>
          <div className="row">
            <div className="col-md-4">
              <Select.Async
                name="to"
                placeholder="Куда"
                filterOption={() => true}
                loadOptions={this.handleChangeAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default CartPage;

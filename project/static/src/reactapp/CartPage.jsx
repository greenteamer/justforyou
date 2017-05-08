import React, { Component, PropTypes } from 'react';
import { toJS, autorun, observable, autorunAsync, computed } from 'mobx';
import { observer } from 'mobx-react';
import { AddButton, RemoveButton } from './components/products';
import { tooltipFn } from './utils';
import Select from 'react-select';
import * as API from './api';
import DeliveryDataTable from './components/cart/DeliveryDataTable';
import DeliveryVariants from './components/cart/DeliveryVariants';
import SpecifyDelivery from './components/cart/SpecifyDelivery';
// import _ from 'underscore';


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
        <div className="col-md-2 bg-warm-grey-5">
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

  @observable addressSuggestions = [];
  @observable addressValue = null;
  @observable kladrId = '';
  @observable query = '';
  @observable specify = false;
  @observable variants = null;
  @observable selectedVariant = null;

  constructor(props) {
    super();
    // получаем город по ip и добавляем результат в массив
    const { store } = props;
    API.suggestion(API.ENDPOINTS.GET_SUGGEST_ADDRESS_BY_IP())
      .then(result => {
        this.kladrId = result.location.data.kladr_id;
        if (result.location) {
          this.addressSuggestions.push(result.location);
        }
      });

    autorunAsync(() => {
      if (this.query && this.kladrId.length !== 0) {
        this.fetchSuggestions();
      }
    }, 1500);

    autorun(() => {
      if (store.delivery && store.delivery.city || store.delivery && store.delivery.settlement) {
        const region = store.delivery.region ? store.delivery.region : '';
        const city = store.delivery.city ? store.delivery.city : '';
        const address = `${store.delivery.street} ${store.delivery.home} ${store.delivery.flat}`;
        this.query = `${region} ${city} ${address}`;
      }
    });
  }

  @computed get addressArray() {
    return this.addressSuggestions.map((city, index) => {
      return {value: index, label: city.unrestricted_value};
    });
  }

  fetchSuggestions = () => {
    const data = {
      query: this.query,
      locations_boost: [{
        kladr_id: this.kladrId,
      }],
    };
    API.suggestion(API.ENDPOINTS.GET_SUGGEST_ADDRESS(), data)
      .then(result => {
        this.addressSuggestions.replace(result.suggestions);
      });
  }

  static propTypes = {
    store: PropTypes.object,
  }

  handleOnInputChange = (value) => {
    this.query = value;
  }

  handleOnChange = (value) => {
    const { store, store: { delivery } } = this.props;
    store.hasForegroundFetching = true;
    this.addressValue = value;
    const data = toJS(this.addressSuggestions[value.value].data);
    delivery.changeData(data);
    API.sendit(API.ENDPOINTS.GET_SENDIT(), {
      country: data.country,
      city: data.city,
      settlement: data.settlement,
      weight: `${store.totalWeight / 1000}`,
    }).then(result => {
      this.variants = result;
      store.hasForegroundFetching = false;
    });
  }

  handleOnFocus = () => {
    this.addressValue = null;
  }

  processingOrder = () => {
    const { store } = this.props;
    store.pushOrder();
    window.location.pathname = '/order/';
  }

  render() {
    const { store } = this.props;
    const { delivery } = store;
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
              store.userCartitems.map((c, index) => <CartItem key={index} item={c}/>)
              || <div className="col-md-12">
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
            <div className="col-md-6" key={this.cityKey}>
              <p className="mb1">Введите Ваш адрес:</p>
              <div className="pv1 ph3 bg-light-gray mb3 gray">
                <p className="mb1">Пример: новороссийск дзержинского 224 120</p>
              </div>
              <Select
                name="to"
                placeholder="Город"
                arrowRenderer={() => null}
                filterOption={() => true}
                value={this.addressValue}
                options={toJS(this.addressArray)}
                onInputChange={this.handleOnInputChange}
                onChange={this.handleOnChange}
              />
              <br/>
              {this.addressValue &&
                <button
                  className="btn btn-medium rounded btn-green"
                  onClick={() => { this.specify = true; }}
                >Уточнить</button>
              }
              {this.specify &&
                <SpecifyDelivery delivery={delivery}/>
              }
            </div>
            <div className="col-md-6">
              <DeliveryDataTable delivery={delivery} />
            </div>
          </div>
        </div>
        {
          <div className="col-xs-6">
            {this.variants && <h3>Выберите вариант доставки:</h3>}
            <DeliveryVariants variants={this.variants} store={store}/>
          </div>
        }
        {
          <div className="fixed bottom-0 right-0 pa3 bg-brown white z-999 ba">
            <div className="flex">
              <div className="ph2">
                <h5>Доставка: </h5>
                <p className="mb1">{delivery.provider_name} {delivery.provider_type}</p>
                <p className="mb1">срок доставки: {delivery.days}</p>
                <p className="mb1">стоимость доставки: {delivery.price}</p>
              </div>
              <div className="ph2">
                <h4 className="tr">Стоимость товаров: {store.totalPrice} р.</h4>
                <h4 className="tr">Общая стоимость: {store.totalPriceWithDelivery} р.</h4>
                <button
                  className="btn btn-medium rounded btn-white fr"
                  onClick={() => this.processingOrder()}
                >Оформить заказ</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>;
  }
}

export default CartPage;

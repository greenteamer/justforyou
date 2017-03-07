import React, { Component, PropTypes } from 'react';
import { toJS, observable, autorunAsync, computed } from 'mobx';
import { observer } from 'mobx-react';
import { AddButton, RemoveButton } from './components/products';
import { TextField } from './components/ui';
import { tooltipFn } from './utils';
import Select from 'react-select';
import * as API from './api';
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
class SpecifyDelivery extends Component {
  static propTypes = {
    delivery: PropTypes.object,
  }

  render() {
    const { delivery } = this.props;
    return <div className="mv3 bg-light-gray pa2 ba bd-1px bd-mild-gray2">
      <div className="row mb3">
        <div className="col-xs-9">
          <p className="mb1">Регион:</p>
          <TextField
            placeholder="Регион"
            value={delivery.region ? delivery.region : ''}
            onChange={(e) => {
              delivery.region = e.target.value;
            }}
          />
        </div>
        <div className="col-xs-3">
          <p className="mb1">Тип региона:</p>
          <TextField
            placeholder=""
            value={delivery.region_type ? delivery.region_type : ''}
            onChange={(e) => { delivery.region_type = e.target.value; }}
          />
        </div>
      </div>
      <div className=" mb3">
        <p className="mb1">Город:</p>
        <TextField
          placeholder="Город"
          value={delivery.city ? delivery.city : ''}
          onChange={(e) => { delivery.city = e.target.value; }}
        />
      </div>
      <div className="row mb3">
        <div className="col-xs-3">
          <p className="mb1">Тип:</p>
          <TextField
            placeholder=""
            value={delivery.settlement_type ? delivery.settlement_type : ''}
            onChange={(e) => { delivery.settlement_type = e.target.value; }}
          />
        </div>
        <div className="col-xs-9">
          <p className="mb1">Населенный пункт:</p>
          <TextField
            placeholder="Населенный пункт"
            value={delivery.settlement ? delivery.settlement : ''}
            onChange={(e) => { delivery.settlement = e.target.value; }}
          />
        </div>
      </div>
      <div className="row mb3">
        <div className="col-xs-3">
          <p className="mb1">Тип:</p>
          <TextField
            placeholder=""
            value={delivery.street_type ? delivery.street_type : ''}
            onChange={(e) => { delivery.street_type = e.target.value; }}
          />
        </div>
        <div className="col-xs-6">
          <p className="mb1">Улица:</p>
          <TextField
            placeholder="Улица"
            value={delivery.street ? delivery.street : ''}
            onChange={(e) => { delivery.street = e.target.value; }}
          />
        </div>
        <div className="col-xs-3">
          <p className="mb1">Индекс:</p>
          <TextField
            placeholder=""
            value={delivery.postal_code ? delivery.postal_code : ''}
            onChange={(e) => { delivery.postal_code = e.target.value; }}
          />
        </div>
      </div>
      <div className="row mb3">
        <div className="col-xs-4">
          <p className="mb1">Дом:</p>
          <TextField
            placeholder="Дом"
            value={delivery.house ? delivery.house : ''}
            onChange={(e) => { delivery.house = e.target.value; }}
          />
        </div>
        <div className="col-xs-2">
          <p className="mb1">Тип:</p>
          <TextField
            placeholder=""
            value={delivery.block_type ? delivery.block_type : ''}
            onChange={(e) => { delivery.block_type = e.target.value; }}
          />
        </div>
        <div className="col-xs-2">
          <p className="mb1">к/стр:</p>
          <TextField
            placeholder=""
            value={delivery.block ? delivery.block : ''}
            onChange={(e) => { delivery.block = e.target.value; }}
          />
        </div>
        <div className="col-xs-4">
          <p className="mb1">Квартира:</p>
          <TextField
            placeholder="Квартира"
            value={delivery.flat ? delivery.flat : ''}
            onChange={(e) => { delivery.flat = e.target.value; }}
          />
        </div>
      </div>
    </div>;
  }
}


@observer
class DataTable extends Component {
  static propTypes = {
    delivery: PropTypes.object,
  }

  render() {
    const { delivery } = this.props;
    return <table className="table table-bordered">
      <tbody>
        <tr>
          <td>Индекс</td>
          <td>{delivery.postal_code}</td>
        </tr>
        <tr>
          <td>Регион</td>
          <td>{delivery.region} {delivery.region_type}</td>
        </tr>
        <tr>
          <td>Город</td>
          <td>{delivery.city_type} {delivery.city}</td>
        </tr>
        <tr>
          <td>Населенный пункт</td>
          <td>{delivery.settlement_type} {delivery.settlement}</td>
        </tr>
        <tr>
          <td>Адрес</td>
          <td>{delivery.street_type} {delivery.street}, {delivery.house_type} {delivery.house}, {delivery.flat_type} {delivery.flat}</td>
        </tr>
      </tbody>
    </table>;
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

  constructor() {
    super();
    // получаем город по ip и добавляем результат в массив
    API.suggestion(API.ENDPOINTS.GET_SUGGEST_ADDRESS_BY_IP())
      .then(result => {
        this.kladrId = result.location.data.kladr_id;
        // const obj = result.location;
        // obj.unrestricted_value = `${result.location.data.region_with_type}, ${result.location.data.city_with_type}`;
        if (result.location) {
          this.addressSuggestions.push(result.location);
        }
      });

    autorunAsync(() => {
      if (this.query && this.kladrId.length !== 0) {
        this.fetchSuggestions();
      }
    }, 1500);

    // autorun(() => {
    //   if (this.addressArray.length !== 0) {
    //     this.addressValue = 0;
    //   }
    // });
    // autorun(() => {
    //   if (this.variants) {
    //     console.log('variants: ', toJS(this.variants));
    //   }
    //   if (this.selectedVariant) {
    //     console.log('selectedVariant: ', toJS(this.selectedVariant));
    //   }
    // });
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
    const { store: { delivery } } = this.props;
    this.addressValue = value;
    const data = toJS(this.addressSuggestions[value.value].data);
    delivery.changeData(data);

    API.sendit(API.ENDPOINTS.GET_SENDIT(), {
      country: data.country,
      city: data.city,
      settlement: data.settlement,
      weight: '4.5',
    }).then(result => {
      this.variants = result;
    });
  }

  handleOnFocus = () => {
    this.addressValue = null;
  }

  handleOnSelectDeliveryVariant = (item, provider) => {
    const { store: { delivery } } = this.props;
    if (delivery.provider_name === provider && delivery.provider_type === item.type_name && delivery.price === item.price) {
      delivery.provider_name = '';
      delivery.provider_type = '';
      delivery.price = null;
      delivery.days = null;
    }
    else {
      delivery.provider_name = provider;
      delivery.provider_type = item.type_name;
      delivery.price = item.price;
      delivery.days = item.days;
    }
  }

  render() {
    const { store } = this.props;
    const { delivery } = store;
    if (!delivery) return null;
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
              <DataTable delivery={delivery} />
            </div>
          </div>
        </div>
        <div className="col-xs-12">
          {this.variants && <h3>Выберите вариант доставки:</h3>}
          {this.variants &&
            Object.keys(toJS(this.variants)).map((key, index) => {
              return <div className="row" key={index}>
                <div className="col-xs-12">
                  <h4 className="card-title">{store.providers()[key].name}</h4>
                </div>
                {this.variants[key].map((item, index) => <div
                  onClick={() => this.handleOnSelectDeliveryVariant(item, key)}
                  className="col-xs-6 pointer"
                  key={index}
                >
                  <div
                    className={`card ${item.type_name === delivery.provider_type && key === delivery.provider_name ? 'selected' : ''}`}
                  >
                    <div className="card-block">
                      <h4 className="card-title">{item.type_name}</h4>
                      <h5 className="card-title">Время доставки: {item.days} дней</h5>
                      <h3>{item.price} р.</h3>
                    </div>
                  </div>
                </div>)}
              </div>;
            })
          }
        </div>
        <div className="fixed bottom-0 right-0 pa3 bg-green white z-999 ba">
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
                onClick={() => console.log('order')}
              >Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default CartPage;

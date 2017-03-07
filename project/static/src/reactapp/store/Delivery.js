/* eslint camelcase: [2, {properties: "never"}] */
import { autorunAsync, extendObservable, observable, action, computed } from 'mobx';
import * as API from '../api';


export default class Delivery {
  @observable id;
  @observable cartId;

  // @observable addressQuery = '';
  // @observable addressSuggestions = [];

  constructor(store, obj) {
    this._store = store;
    this.id = obj.id;
    this.cartId = obj.cart_id;

    extendObservable(this, initialData, obj ? obj : {});

    autorunAsync(() => {
      if (store.getCartId() === this.cartId && this.id) {
        API.request(API.ENDPOINTS.PUT_DELIVERY(this.id), this.toJS);
      }
    }, 1500);
    // autorun(() => {
    //   console.log('delivery: ', toJS(this));
    //   console.log('delivery: ', this.toJS);
    // });
  }

  @action setData = (name, value) => {
    this[name] = value;
  }

  @action setId = (id) => {
    this.id = id;
  }

  @action setCartId = (id) => {
    this.cartId = id;
  }

  @action changeData = (data) => {
    for (const key of Object.keys(initialData)) {
      // console.log('key: ', key);
      if (data[key] !== '') {
        this[key] = data[key];
      }
    }
  }

  @computed get value() {
    return `${this.city_type} ${this.city}, ${this.street_type} ${this.street}`;
  }

  @computed get unrestrictedValue() {
    return `${this.city_type} ${this.city}, ${this.region} ${this.region_type}, ${this.street_type} ${this.street}`;
  }

  @computed get toJS() {
    const obj = {
      id: this.id,
      cart_id: this.cartId,
      area: this.area,
      area_type: this.area_type,
      block: this.block,
      block_type: this.block_type,
      postal_code: this.postal_code,
      country: this.country,
      region: this.region,
      region_type: this.region_type,
      city: this.city,
      city_type: this.city_type,
      street: this.street,
      street_type: this.street_type,
      settlement: this.settlement,
      settlement_type: this.settlement_type,
      house: this.house,
      house_type: this.house_type,
      flat: this.flat,
      flat_type: this.flat_type,

      provider_name: this.provider_name,
      provider_type: this.provider_type,
      days: this.days,
      price: this.price,
    };
    return obj;
  }

}

const initialData = {
  area: null,
  area_type: null,
  block: null,
  block_type: null,
  postal_code: null,
  country: null,
  region: null,
  region_type: null,
  city: null,
  city_type: null,
  street: null,
  street_type: null,
  settlement: null,
  settlement_type: null,
  house: null,
  house_type: null,
  flat: null,
  flat_type: null,

  provider_name: null,
  provider_type: null,
  days: null,
  price: null,
};

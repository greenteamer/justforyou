import { autorunAsync, observable, action, computed } from 'mobx';
import * as API from '../api';


export default class CartItems {
  @observable count;
  @observable id;
  @observable cartId;
  @observable property;

  constructor(store, obj) {
    this._store = store;
    this.id = obj.id;
    this.product = obj.product;
    this.property = obj.property;
    this.count = obj.count;
    this.cartId = obj.cart_id;

    autorunAsync(() => {
      if (this._store.getCartId() === this.cartId) {
        API.request(API.ENDPOINTS.PUT_CARTITEM(this.id), this.asJson);
      }
    }, 600);
  }

  @action increment = () => {
    this.count += 1;
  }

  @action decrement = () => {
    const count = this.count > 0 ? this.count - 1 : 0;
    if (count === 0) {
      this.remove();
    }
    else {
      this.count = count;
    }
  }

  @action remove = () => {
    API.request(API.ENDPOINTS.DELETE_CARTITEM(this.id));
    this._store.cartitems.replace(observable(this._store.cartitems.filter(item => item.id !== this.id)));
  }

  @action setId = (id) => {
    this.id = id;
  }

  @action setCartId = (id) => {
    this.cartId = id;
  }

  @computed get totalPrice() {
    const price = this.propertyObj
      ? this.propertyObj.price
      : this.productObj.price;
    return this.count * price;
  }

  @computed get totalWeight() {
    const weight = this.propertyObj
      ? this.propertyObj.value
      : this.productObj.weight;
    return this.count * weight;
  }

  @computed get productObj() {
    if (!this._store.products.length) return null;
    return this._store.products.find(product => product.id === this.product);
  }

  @computed get propertyObj() {
    if (!this._store.properties.length) return null;
    return this._store.properties.find(p => p.id === this.property);
  }

  @computed get asJson() {
    return {
      id: this.id,
      product: this.product,
      property: this.property,
      count: this.count,
      cart_id: this.cartId,
    };
  }

}


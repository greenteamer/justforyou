import { observable, action, autorun, computed, toJS } from 'mobx';


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
  }

  @action increment = () => {
    this.count += 1;
  }

  @action decrement = () => {
    this.count = this.count > 0 ? this.count - 1 : 0;
  }

  @action setId = (id) => {
    this.id = id;
  }

  @action setCartId = (id) => {
    this.cartId = id;
  }

  @computed get totalPrice() {
    const product = this._store.products.find(product => product.id === this.product);
    const property = this._store.properties.find(p => p.id === this.property);
    const price = property? property.price : product.price;
    return this.count * price;
  }

  @computed get toJS() {
    return toJS(this);
  }

}

import { observable, action, computed, toJS } from 'mobx';


export default class CartItems {
  @observable count;
  @observable id;
  @observable cartId;
  @observable property;

  constructor(obj, store) {
    this._store = store;
    this.id = obj.id;
    this.product = obj.product;
    this.property = obj.property;
    this.count = obj.count;
    this.cartId = obj.cart_id;

    // autorun(() => {
    //   console.log('CartItem price: ', this.totalPrice);
    // });
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
    let price = null;
    if (this._store.properties.length > 0 && this._store.products.length > 0) {
      const property = this._store.properties.find(prop => prop.id === this.property);
      const product = this._store.products.find(product => product.id === this.product);
      price = property ? this.count * property.price : this.count * product.price;
    }
    return price;
  }

  @computed get toJS() {
    return toJS(this);
  }

}

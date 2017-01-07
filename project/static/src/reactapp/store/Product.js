import { autorun, observable, action, toJS, computed } from 'mobx';
import { getCookie } from '../utils';


export default class Product {
  @observable images = [];
  @observable properties = [];

  constructor(store, obj) {
    this._store = store;
    this.id = obj.id;
    this.slug = obj.slug;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.category = obj.category;

    // this.getProperties(store, obj);
    this.getImages(store, obj);

    autorun(() => {
      if (this.productProperties.length > 0) {
        this.properties.replace(this.productProperties);
      }
    });

    autorun(() => {
      if (this.properties.length !== 0 && !this.properties.find(prop => prop.isActive)) {
        this.properties[0].setActive();
      }
    });

    // autorun(() => {
    //   console.log('Product - maxPrice ' + this.id, this.maxPrice);
    // });
  }

  @action getImages(store, obj) {
    const images = store.images.slice()
      .filter(img => obj.images.includes(img.id));
    this.images.replace(images);
  }

  @action setActiveProperty(id) {
    this.properties.find(prop => prop.id === id).setActive();
    const unactiveProperties = this.properties.filter(prop => prop.id !== id);
    for (const prop of unactiveProperties) {
      prop.setUnactive();
    }
  }

  @action addToCart = () => {
    this._store.addCartItem(this.id);
  }

  @action removeFromCart = () => {
    this._store.removeCartItem(this.id);
  }

  @computed get productProperties() {
    return this._store.properties
      .filter(prop => prop.product === this.id)
      .sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  }

  @computed get currentPrice() {
    return this.productProperties.length !== 0
      ? this.activeProperty.price
      : this.price;
  }

  @computed get maxPrice() {
    return this.properties.length !== 0
      ? this.properties
          .sort((a, b) => a.price - b.price)
          [this.properties.length-1]
          .price
      : this.price;
  }

  @computed get minPrice() {
    return this.properties.length !== 0
      ? this.properties
          .sort((a, b) => a.price - b.price)[0]
          .price
      : this.price;
  }

  @computed get activeProperty() {
    return this.properties.find(prop => prop.isActive);
  }

  @computed get activeCartitem() {
    if (this.activeProperty) {
      // возвращаем cartitem по активному property и cartId
      return store.cartitems.find(i => i.property === this.activeProperty.id && i.cartId === getCookie('cart_id'));
    }
    else {
      // возвращаем cartitem по продукту и cartId если нет дополнительных properties
      return store.cartitems.find(i => i.product === this.id && i.cartId === getCookie('cart_id'));
    }
  }

  @computed get toJS() {
    return toJS(this);
  }
}

import { autorun, observable, action, toJS, computed } from 'mobx';
import { renderButtons, renderPrice, renderProperties } from '../reactions';


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

    autorun(() => {
      renderPrice(this.id, this.activeProperty);
      renderProperties(this, this.productProperties);
      renderButtons(this.id, this.activeCartitem);
    });
  }

  @action getImages(store, obj) {
    const images = store.images.slice()
      .filter(img => obj.images.includes(img.id));
    this.images.replace(images);
  }

  @action setActiveProperty = (id) => {
    this.properties.find(prop => prop.id === id).setActive();
    const unactiveProperties = this.properties.filter(prop => prop.id !== id);
    for (const prop of unactiveProperties) {
      prop.setUnactive();
    }
  }

  @action addToCart = () => {
    this._store.addCartItem(this);
  }

  @action removeFromCart = () => {
    this._store.removeCartItem(this);
  }

  @computed get productProperties() {
    return this._store.properties
      .filter(prop => prop.product === this.id)
      .sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  }

  @computed get activeProperty() {
    return this.properties.find(prop => prop.isActive);
  }

  @computed get activeCartitem() {
    if (this.activeProperty) {
      // возвращаем cartitem по активному property
      return store.cartitems.find(i => i.property === this.activeProperty.id);
    }
    else {
      // возвращаем cartitem по продукту если нет дополнительных properties
      return store.cartitems.find(i => i.product === this.id);
    }
  }

  @computed get toJS() {
    return toJS(this);
  }
}

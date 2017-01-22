import { observable, action, autorun, computed, toJS } from 'mobx';


export default class Property {

  @observable isActive = false;
  @observable type = {};

  constructor(store, obj) {
    this._store = store;
    this.id = obj.id;
    this.product = obj.product;
    this.value = obj.value;
    this.price = obj.price;

    autorun(() => {
      this.type = store.types.find(type => type.id === obj.type);
    });
  }

  @action setActive() {
    this.isActive = true;
  }

  @action setUnactive() {
    this.isActive = false;
  }

  @computed get inUse() {
    if (this._store) {
      return this._store.cartitems.find(c => c.property === this.id)
    }
    return null;
  }

  @computed get toJS() {
    return toJS(this);
  }

}

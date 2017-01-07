import { observable, action, autorun, computed, toJS } from 'mobx';


export default class Property {

  @observable isActive = false;
  @observable type = {};

  constructor(store, obj) {
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

  @computed get toJS() {
    return toJS(this);
  }

}

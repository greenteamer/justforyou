import { observable, action, autorun, computed, toJS } from 'mobx';
import $ from 'jquery';


export default class Property {

  @observable isActive = false;

  constructor(store, obj) {
    this.id = obj.id;
    this.product = obj.product;
    this.value = obj.value;
    this.price = obj.price;

    this.getType(store, obj);
    autorun(() => {
      if (this.isActive) {
        $(`#property-${this.id}`).addClass('active');
      }
      else {
        $(`#property-${this.id}`).removeClass('active');
      }
    });
  }

  @action getType(store, obj) {
    const typeObject = store.types.find(type => type.id === obj.type);
    this.type = typeObject;
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

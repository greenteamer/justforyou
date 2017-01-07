import { observable, action, autorun, computed, toJS } from 'mobx';
import { changeActivePropertyReaction } from '../reactions';
import { productButtons } from '../components';
import store from './Store';


export default class Property {
  @observable isActive = false;

  constructor(obj) {
    this.id = obj.id;
    this.product = obj.product;
    this.value = obj.value;
    this.price = obj.price;

    autorun(() => {
      if (store.types.length !== 0) {
        this.type = store.types.find(type => type.id === obj.type);
      }
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

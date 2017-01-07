import { autorun, action, observable, computed, toJS} from 'mobx';


class UIStore {
  @observable catalogFilter = null;
  @observable isLoading = true;
  @observable priceFilter = []

  constructor() {
    window.UIStore = this;
  }

  @action setCatalogFilter = (catalogId) => {
    this.catalogFilter = catalogId;
  }

  @action setPriceFilter = (value) => {
    this.priceFilter = value;
  }

  @action startLoading = () => {
    this.isLoading = true;
  }

  @action finishLoading = () => {
    this.isLoading = false;
  }

  @computed get toJS(): Object {
    return toJS(this);
  }

}

const uiStore = new UIStore();
export default uiStore;

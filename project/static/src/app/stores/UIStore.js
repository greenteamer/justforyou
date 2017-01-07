import { autorun, action, observable, computed, toJS} from 'mobx';


class UIStore {
  @observable catalogFilter = null;
  @observable isLoading = false;

  constructor() {
    this.isLoading = false;
    this.catalogFilter = null;

    autorun(() => {
      console.log('UIStore catalogFilter: ', this.catalogFilter);
    });

    window.UIStore = this;
  }

  @action setCatalogFilter = (catalogId) => {
    this.catalogFilter = catalogId;
  }

  @action startLoading = () => {
    this.isLoading = true;
  }

  @action finishLoading = () => {
    this.isLoading = false;
  }

  @computed get toJS() {
    return toJS(this);
  }

}

const uiStore = new UIStore();
export default uiStore;

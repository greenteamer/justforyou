import { autorun, action, observable, computed, toJS, extendObservable} from 'mobx';
import singleton from 'singleton';


class UIStore extends singleton {
  @observable catalogFilter = null;
  @observable isLoading = true;
  @observable priceFilter = []
  @observable sorting = null;


  constructor() {
    super();
    window.UIStore = this;

    autorun(() => {
      console.log('-------- UIStore isLoading: ', this.isLoading);
    });

    autorun(() => {
      console.log('-------- UIStore priceFilter: ', toJS(this.priceFilter));
    });

    // autorun(() => {
      // console.log('-------- UIStore catalogFilter: ', this.catalogFilter);
      // console.log('-------- UIStore sorting: ', toJS(this.sorting));
    // });
  }

  @action setCatalogFilter = (catalogId) => {
    console.log('test setCatalogFilter catalogId: ', catalogId);
    this.catalogFilter = catalogId;
  }

  @action setPriceFilter = (value) => {
    this.priceFilter = value;
  }

  @action setSorting = (value) => {
    this.sorting = value;
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

const uiStore = UIStore.get();
export default uiStore;

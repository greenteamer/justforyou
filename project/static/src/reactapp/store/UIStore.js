import { autorun, action, observable, computed, toJS } from 'mobx'
import singleton from 'singleton'
// import store from './Store';

class UIStore extends singleton {
  @observable catalogFilter = null
  @observable isLoading = true
  @observable priceFilter = []
  @observable sorting = null

  constructor() {
    super()
    window.UIStore = this
    autorun(() => {
      console.log('-------- UIStore isLoading: ', this.isLoading)
    })
  }

  @action
  setCatalogFilter = catalogId => {
    this.catalogFilter = catalogId
  }

  @action
  setPriceFilter = value => {
    this.priceFilter = value
  }

  @action
  setSorting = value => {
    this.sorting = value
  }

  @action
  startLoading = () => {
    this.isLoading = true
  }

  @action
  finishLoading = () => {
    this.isLoading = false
  }

  // @computed get catalogFilterObj() {
  //   if (!store.catalogs) return null;
  //   return store.catalogs.find(c => this.catalogFilter === c.id);
  // }

  @computed
  get toJS(): Object {
    return toJS(this)
  }
}

const uiStore = UIStore.get()
export default uiStore

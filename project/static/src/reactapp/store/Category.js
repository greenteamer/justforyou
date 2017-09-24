import { extendObservable, observable, action, autorun, computed, toJS } from 'mobx'
import { getCookie } from '../utils'

const initialData = {
  id: null,
  slug: '',
  name: '',
  absoluteUrl: '',
  tree_id: null,
  lft: null,
  rght: null,
  level: null,
  parent: null
}

export default class Category {
  constructor(store, obj) {
    this._store = store
    extendObservable(this, initialData, obj ? obj : {})
  }

  @computed
  get descendants() {
    if (!this._store.categories) return []
    return this._store.categories.filter(cat => cat.parent === this.id)
  }

  @computed
  get toJS() {
    return toJS(this)
  }
}

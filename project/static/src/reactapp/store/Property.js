import { observable, action, autorun, computed, toJS } from 'mobx'
import { getCookie } from '../utils'

export default class Property {
  @observable isActive = false
  @observable type = {}

  constructor(store, obj) {
    this._store = store
    this.id = obj.id
    this.product = obj.product
    this.value = obj.value
    this.price = obj.price

    autorun(() => {
      this.type = store.types.find(type => type.id === obj.type)
    })
  }

  @action
  setActive() {
    this.isActive = true
  }

  @action
  setUnactive() {
    this.isActive = false
  }

  @computed
  get inUse() {
    if (this._store) {
      const cartId = getCookie('cart_id')
      // console.log('property inUse cartId: ', cartId);
      return this._store.cartitems.find(c => c.property === this.id && c.cartId === cartId)
    }
    return null
  }

  @computed
  get toJS() {
    return toJS(this)
  }
}

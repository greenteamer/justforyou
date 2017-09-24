import { extendObservable, observable, action, autorun, computed, toJS } from 'mobx'
import { getCookie } from '../utils'

const initialData = {}

export default class Image {
  constructor(store, obj) {
    this._store = store
    extendObservable(this, initialData, obj ? obj : {})
  }

  @computed
  get relevantUrl() {
    if (this.mainCropper === 'vertical') return this.croppedVerticalImage
    return this.croppedImage
  }

  @computed
  get toJS() {
    return toJS(this)
  }
}

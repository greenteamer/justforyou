import { autorun, extendObservable, toJS, computed } from 'mobx';


export default class User {
  constructor(obj = {}) {
    extendObservable(this, initialObject, obj);
    autorun(() => {
      console.log('User.js : ', toJS(this));
    });
  }

  @computed get toJS() {
    return toJS(this);
  }
}


const initialObject = {
  username: null,
  email: null,
  id: null,
};

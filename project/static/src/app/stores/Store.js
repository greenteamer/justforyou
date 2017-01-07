import { action, observable, runInAction, computed, toJS} from 'mobx';
import * as API from '../api';
import Product from './Product';
import Property from './Property';
import CartItem from './CartItems';
import uiStore from './UIStore';
import singleton from 'singleton';


class Store extends singleton {
  @observable categories;
  @observable products;
  @observable images;
  @observable types;
  @observable properties;
  @observable cartitems;
  @observable orders;
  @observable isLoading;

  constructor() {
    super();
    this.isLoading = false;
    this.categories = [];
    this.products = [];
    this.images = [];
    this.properties = [];
    this.types = [];
    this.cartitems = [];
    this.orders = [];

    this.pullProducts();
    this.pullCategories();
    this.pullImages();
    this.pullProperties();
    this.pullTypes();
    this.pullCartItems();

    // autorun(() => {
    //   console.log('cartitems: ', toJS(this.cartitems));
    //   console.log('total price: ', this.totalPrice);
    // });

    window.mobx = {action, observable, runInAction, computed, toJS};
    window.store = this;
  }

  async pullCategories() {
    uiStore.startLoading();
    const categories = await API.request(API.ENDPOINTS.GET_CATEGORIES());
    runInAction('update after fetching data', () => {
      this.categories.replace(categories);
      uiStore.finishLoading();
    });
  }

  async pullProducts() {
    uiStore.startLoading();
    const products = await API.request(API.ENDPOINTS.GET_PRODUCTS());
    runInAction('update after fetching data', () => {
      this.products.replace(products.map(product => new Product(this, product)));
      uiStore.finishLoading();
    });
  }

  async pullImages() {
    uiStore.startLoading();
    const images = await API.request(API.ENDPOINTS.GET_IMAGES());
    runInAction('update after fetching data', () => {
      this.images.replace(images);
      uiStore.finishLoading();
    });
  }

  async pullProperties() {
    uiStore.startLoading();
    const properties = await API.request(API.ENDPOINTS.GET_PROPERTIES());
    runInAction('update after fetching data', () => {
      this.properties.replace(properties.map(prop => new Property(this, prop)));
      uiStore.finishLoading();
    });
  }

  async pullTypes() {
    uiStore.startLoading();
    const types = await API.request(API.ENDPOINTS.GET_TYPES());
    runInAction('update after fetching data', () => {
      this.types.replace(types);
      uiStore.finishLoading();
    });
  }

  async pullCartItems() {
    uiStore.startLoading();
    const cartitems = await API.request(API.ENDPOINTS.GET_CARTITEMS());
    runInAction('update after fetching data', () => {
      this.cartitems.replace(cartitems.map(item => new CartItem(item, this)));
      uiStore.finishLoading();
    });
  }

  @action addCartItem = async (productId) => {
    const product = this.products.find(p => p.id === productId);
    const data = {
      product: product.id,
      property: product.activeProperty ? product.activeProperty.id : null,
      count: 1,
    };
    const existCartItem = this.findCartItem(product);
    if (existCartItem) {
      existCartItem.increment();
      data.count = existCartItem.count;
    }
    else {
      this.cartitems.push(new CartItem(data, this));
    }
    const response = await API.request(API.ENDPOINTS.POST_CARTITEM(), data);
    this.findCartItem(product).setId(response.data.id);
  }

  @action removeCartItem = async (product) => {
    const data = {
      product: product.id,
      property: product.activeProperty ? product.activeProperty.id : null,
      count: 1,
      cart_id: this.getCartId,
    };
    const existCartItem = this.findCartItem(product);
    if (existCartItem) {
      existCartItem.decrement();
      data.count = existCartItem.count;
      if (existCartItem.count === 0) {
        await API.request(API.ENDPOINTS.DELETE_CARTITEM(existCartItem.id), data);
        this.cartitems = this.cartitems.filter(item => item.id !== existCartItem.id);
      }
      else {
        await API.request(API.ENDPOINTS.POST_CARTITEM(), data);
      }
    }
  }

  @computed get getCartId() {
    const cartId = localStorage.getItem('cart_id');
    if (cartId === null) return this.setCartId();
    return cartId;
  }

  setCartId = () => {
    const cartId = makeId();
    localStorage.setItem('cart_id', cartId);
    return cartId;
  }

  @computed get productsByCategory() {
    return uiStore.catalogFilter !== null
      ? this.products.filter(product => product.category.includes(uiStore.catalogFilter))
      : this.products;
  }

  findCartItem(product) {
    // finding existing cartItem by product.id, cartId & product.property
    const propertyId = product.activeProperty ? product.activeProperty.id : null;
    return this.cartitems
      .find(item => {
        return item.product === product.id
          // && item.cartId === this.getCartId
          && item.property === propertyId;
      });
  }

  @computed get totalPrice() {
    if (this.isLoading) return null;
    return this.cartitems
      .filter(item => item.cartId === this.getCartId)
      .reduce((sum, current) => {
        return sum + current.totalPrice;
      }, 0);
  }

  @computed get totalItems() {
    if (this.isLoading) return null;
    return this.cartitems.filter(item => item.cartId === this.getCartId).length;
  }

  @computed get toJS() {
    return toJS(this);
  }

}

const store = Store.get();
export default store;


export const makeId = () => {
  return 'makeIdTest';
}

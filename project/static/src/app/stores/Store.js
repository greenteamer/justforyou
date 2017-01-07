import { action, autorun, observable, runInAction, computed, toJS} from 'mobx';
import * as API from '../api';
import Product from './Product';
import Property from './Property';
import CartItem from './CartItems';
import uiStore from './UIStore';
import singleton from 'singleton';
import { getCookie } from '../utils';
import { renderCartbox } from '../reactions/renderCart';


class Store extends singleton {
  @observable categories;
  @observable products;
  @observable images;
  @observable types;
  @observable properties;
  @observable cartitems = [];
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
    this.orders = [];

    this.pullProducts();
    this.pullCategories();
    this.pullImages();
    this.pullProperties();
    this.pullTypes();
    this.pullCartItems();

    autorun(() => {
      renderCartbox(this.totalPrice, this.totalItems);
    });

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
      this.properties.replace(properties.map(prop => new Property(prop)));
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
    if (product.activeCartitem) {
      product.activeCartitem.increment();
      data.count = product.activeCartitem.count;
    }
    else {
      this.cartitems.push(new CartItem(data, this));
    }
    const response = await API.request(API.ENDPOINTS.POST_CARTITEM(), data);
    // обновляем сохранненые в базу id и cartId у cartitem
    product.activeCartitem.setId(response.data.id);
    product.activeCartitem.setCartId(response.data.cart_id);
  }

  @action removeCartItem = async (productId) => {
    const product = this.products.find(p => p.id === productId);
    const data = {
      product: product.id,
      property: product.activeProperty ? product.activeProperty.id : null,
      count: 1,
      cart_id: this.getCartId,
    };
    if (product.activeCartitem) {
      product.activeCartitem.decrement();
      data.count = product.activeCartitem.count;
      if (product.activeCartitem.count === 0) {
        await API.request(API.ENDPOINTS.DELETE_CARTITEM(product.activeCartitem.id), data);
        this.cartitems = this.cartitems.filter(item => item.id !== product.activeCartitem.id);
      }
      else {
        await API.request(API.ENDPOINTS.POST_CARTITEM(), data);
      }
    }
  }

  @computed get getCartId() {
    return getCookie('cart_id');
  }

  @computed get productsByCategory() {
    return uiStore.catalogFilter !== null
      ? this.products.filter(product => product.category.includes(uiStore.catalogFilter))
      : this.products;
  }

  // findCartItem(product) {
  //   // finding existing cartItem by product.id, cartId & product.property
  //   const propertyId = product.activeProperty ? product.activeProperty.id : null;
  //   return this.cartitems
  //     .find(item => {
  //       return item.product === product.id
  //         && item.cartId === this.getCartId
  //         && item.property === propertyId;
  //     });
  // }

  @computed get totalPrice() {
    if (this.isLoading) return null;
    const filteredByCartId = this.cartitems.filter(item => item.cartId === this.getCartId);
    return filteredByCartId
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

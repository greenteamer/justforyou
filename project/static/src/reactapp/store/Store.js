import { action, autorun, observable, runInAction, computed, toJS} from 'mobx';
import { makeId, getCookie } from '../utils';
import * as API from '../api';
import Product from './Product';
import Property from './Property';
import CartItem from './CartItems';
import uiStore from './UIStore';


class Store {
  @observable categories;
  @observable products;
  @observable images;
  @observable types;
  @observable properties;
  @observable cartitems;
  @observable orders;
  @observable isLoading;

  constructor() {
    this.isLoading = false;
    this.categories = [];
    this.products = [];
    this.images = [];
    this.properties = [];
    this.types = [];
    this.cartitems = [];
    this.orders = [];

    this.pullAll();

    autorun(() => {
      const path = window.location.pathname.split('/');
      const catalogSlug = path[1] === 'catalog' ? path[2] : null;
      if (this.categories.length !== 0 && catalogSlug) {
        const catalog = this.categories.find(c => c.slug === catalogSlug);
        uiStore.setCatalogFilter(catalog.id);
      };
    });

    // autorun(() => {
    //   console.log('***** store maxProductPrice: ', this.maxProductPrice);
    //   console.log('***** store minProductPrice: ', this.minProductPrice);
    // });

    window.mobx = {action, observable, runInAction, computed, toJS};
    window.store = this;
  }

  async pullAll() {
    uiStore.startLoading();
    // fetch данных
    const images = await API.request(API.ENDPOINTS.GET_IMAGES());
    this.images.replace(images);

    const types = await API.request(API.ENDPOINTS.GET_TYPES());
    this.types.replace(types);

    const properties = await API.request(API.ENDPOINTS.GET_PROPERTIES());
    this.properties.replace(properties.map(prop => new Property(this, prop)));

    const categories = await API.request(API.ENDPOINTS.GET_CATEGORIES());
    this.categories.replace(categories);

    const products = await API.request(API.ENDPOINTS.GET_PRODUCTS());
    this.products.replace(products.map(product => new Product(this, product)));

    const cartitems = await API.request(API.ENDPOINTS.GET_CARTITEMS());
    this.cartitems.replace(cartitems.map(item => new CartItem(this, item)));

    uiStore.finishLoading();
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
      const response = await API.request(API.ENDPOINTS.POST_CARTITEM(), data);
      // обновляем cartitem после получения ответа от сервера
      product.activeCartitem.setId(response.data.id);
      product.activeCartitem.setCartId(response.data.cart_id);
    }
    else {
      let cartitem = new CartItem(this, data);
      this.cartitems.push(cartitem);
      const response = await API.request(API.ENDPOINTS.POST_CARTITEM(), data);
      // обновляем локальный cartitem после получения ответа от сервера
      cartitem.setId(response.data.id);
      cartitem.setCartId(response.data.cart_id);
    }
  }

  @action removeCartItem = async (productId) => {
    const product = this.products.find(p => p.id === productId);
    const data = {
      product: product.id,
      property: product.activeProperty ? product.activeProperty.id : null,
      count: 1,
      cart_id: this.getCartId(),
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


  getCartId() {
    return getCookie('cart_id');
  }

  // ФИЛЬТРАЦИЯ / СОРТИРОВКА
  @computed get productsByCategory() {
    return uiStore.catalogFilter !== null
      ? this.products.filter(product => product.category.includes(uiStore.catalogFilter))
      : this.products;
  }

  @computed get sortedProductsByPrice() {
    return this.productsByCategory
      .sort((a, b) => a.currentPrice - b.currentPrice);
  }

  @computed get filterProductsByPrice() {
    return uiStore.priceFilter.length !== 0
      ? this.productsByCategory
        .filter(p => p.minPrice >= uiStore.priceFilter[0] && p.maxPrice <= uiStore.priceFilter[1])
      : this.productsByCategory;
  }

  @computed get maxProductPrice() {
    if (this.products.length === 0) return null;
    return this.products
      .sort((a, b) => a.maxPrice - b.maxPrice)[this.products.length-1].maxPrice;
  }

  @computed get minProductPrice() {
    if (this.products.length === 0) return null;
    return this.products
      .sort((a, b) => a.minPrice - b.minPrice)[0].minPrice;
  }

  findCartItem(product) {
    // finding existing cartItem by product.id, cartId & product.property
    const propertyId = product.activeProperty ? product.activeProperty.id : null;
    return this.cartitems
      .find(item => {
        return item.product === product.id
          && item.cartId === this.getCartId
          && item.property === propertyId;
      });
  }

  @computed get totalPrice() {
    const filteredByCartId = this.cartitems.filter(item => item.cartId === this.getCartId());
    return filteredByCartId
      .reduce((sum, current) => {
        return sum + current.totalPrice;
      }, 0);
  }
  @computed get totalItems() {
    return this.cartitems.filter(item => item.cartId === this.getCartId()).length;
  }

  @computed get toJS() {
    return toJS(this);
  }

}

export default Store;

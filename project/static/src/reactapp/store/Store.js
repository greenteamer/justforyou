/*
  products - начальный массив... может менятся только при запросе актуальных данных с сервера
    products служит локальным источником правды (все существующие продукты)
  computedProducts - вычесленный массив продуктов ... меняется в результате действий на сайте
    таких как фильтрация, сортировка и т.д.
*/


import { action, autorun, observable, runInAction, computed, toJS, peek} from 'mobx';
import { makeId, getCookie } from '../utils';
import * as API from '../api';
import Product from './Product';
import Property from './Property';
import CartItem from './CartItems';
import uiStore from './UIStore';
import singleton from 'singleton';


class Store extends singleton {
  @observable categories = [];
  @observable products = [];
  @observable computedProducts = [];
  @observable images = [];
  @observable types = [];
  @observable properties = [];
  @observable cartitems = [];
  @observable orders = [];

  constructor() {
    super();
    this.pullAll();

    autorun(() => {
      if (!uiStore.isLoading) {
        const path = window.location.pathname.split('/');
        const catalogSlug = path[1] === 'catalog' ? path[2] : null;
        if (this.categories.length !== 0 && catalogSlug) {
          const catalog = this.categories.find(c => c.slug === catalogSlug);
          uiStore.setCatalogFilter(catalog.id);
        };
      }
    });

    autorun(() => {
      console.log('***** store products: ', toJS(this.products));
      // console.log('***** store : ', this.toJS);
      // console.log('***** store maxProductPrice: ', this.maxProductPrice);
      // console.log('***** store minProductPrice: ', this.minProductPrice);
    });

    window.mobx = {action, observable, runInAction, computed, toJS, peek};
    window.store = this;
  }

  // ФИЛЬТРАЦИЯ / СОРТИРОВКА
  @computed get sortedProducts() {
    // console.log('start filterProductsByPrice this.productsByCategory: ', this.productsByCategory);
    if (uiStore.sorting === 'byMinPrice') {
      return observable(this.filterProductsByPrice.sort((a, b) => a.minPrice - b.minPrice));
    }
    else if (uiStore.sorting === 'byMaxPrice') {
      return observable(this.filterProductsByPrice.sort((a, b) => b.minPrice - a.minPrice));
    }
    else if (uiStore.sorting === 'byName') {
      const newArr = this.filterProductsByPrice
        .map(p => p.name)
        .sort()
        .map(name => this.products.find(prod => prod.name === name));
      console.log('newArr1: ', newArr);
      return observable(newArr);
    }
    else {
      return this.filterProductsByPrice;
    }
  }

  @computed get productsByCategory() {
    // console.log('start productsByCategory this.products: ', this.products);
    return uiStore.catalogFilter !== null
      ? observable(this.products.filter(product => product.category.includes(uiStore.catalogFilter)))
      : this.products;
  }

  @computed get filterProductsByPrice() {
    // console.log('start filterProductsByPrice this.productsByCategory: ', this.productsByCategory);
    return uiStore.priceFilter.length !== 0
      ? observable(this.productsByCategory
          .filter(p => p.minPrice >= uiStore.priceFilter[0] && p.maxPrice <= uiStore.priceFilter[1]))
      : this.productsByCategory;
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

const store = Store.get();
export default store;

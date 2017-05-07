/*
  products - начальный массив... может менятся только при запросе актуальных данных с сервера
    products служит локальным источником правды (все существующие продукты)
  computedProducts - вычесленный массив продуктов ... меняется в результате действий на сайте
    таких как фильтрация, сортировка и т.д.
*/


import { action, autorun, observable, runInAction, computed, toJS, peek} from 'mobx';
import { getCookie } from '../utils';
import * as API from '../api';
import Product from './Product';
import User from './User';
import Property from './Property';
import CartItem from './CartItems';
import Delivery from './Delivery';
import uiStore from './UIStore';
import singleton from 'singleton';
import $ from 'jquery';


class Store extends singleton {
  @observable categories = [];
  @observable products = [];
  @observable computedProducts = [];
  @observable images = [];
  @observable types = [];
  @observable properties = [];
  @observable cartitems = [];
  @observable orders = [];
  @observable delivery = {};
  @observable user = null;
  @observable hasForegroundFetching = false;
  @observable hasBackgroundFetching = false;

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
        }
      }
      else {
        setTimeout(() => {
          $('[data-toggle="tooltip"]').tooltip();
        }, 1000);
      }
    });

    window.mobx = {action, observable, runInAction, computed, toJS, peek};
    window.store = this;
  }

  // ФИЛЬТРАЦИЯ / СОРТИРОВКА
  @computed get sortedProducts() {
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
      return observable(newArr);
    }
    return this.filterProductsByPrice;
  }

  @computed get productsByCategory() {
    return uiStore.catalogFilter !== null
      ? observable(this.products.filter(product => product.category.includes(uiStore.catalogFilter)))
      : this.products;
  }

  @computed get filterProductsByPrice() {
    return uiStore.priceFilter.length !== 0
      ? observable(this.productsByCategory
          .filter(p => p.minPrice >= uiStore.priceFilter[0] && p.maxPrice <= uiStore.priceFilter[1]))
      : this.productsByCategory;
  }

  @computed get popularProducts() {
    return uiStore.catalogFilter !== null
      ? observable(this.products.filter(product => !!product.isPopular))
      : [];
  }

  async pullAll() {
    uiStore.startLoading();
    this.hasForegroundFetching = true;
    // fetch данных
    const users = await API.request(API.ENDPOINTS.GET_USER());
    if (users.length !== 0) {
      this.user = new User(users[0]);
    }

    const images = await API.request(API.ENDPOINTS.GET_IMAGES());
    this.images.replace(images);

    const types = await API.request(API.ENDPOINTS.GET_TYPES());
    this.types.replace(types);

    const properties = await API.request(API.ENDPOINTS.GET_PROPERTIES());
    this.properties.replace(properties.map(prop => new Property(this, prop)));

    const categories = await API.request(API.ENDPOINTS.GET_CATEGORIES());
    this.categories.replace(categories);

    if (window.products.length !== 0) {
      this.products.replace(window.products.map(product => new Product(this, product)));
    }
    // else {
    //   const products = await API.request(API.ENDPOINTS.GET_PRODUCTS());
    //   this.products.replace(products.map(product => new Product(this, product)));
    // }

    const cartitems = await API.request(API.ENDPOINTS.GET_CARTITEMS());
    this.cartitems.replace(cartitems.map(item => new CartItem(this, item)));

    const deliveries = await API.request(API.ENDPOINTS.GET_DELIVERIES());
    if (deliveries.length === 0) {
      this.delivery = new Delivery(this, {cart_id: this.getCartId()});
      const newDelivery = await API.request(API.ENDPOINTS.POST_DELIVERY(), {cart_id: this.getCartId(), price: 0});
      this.delivery.setId(newDelivery.id);
    }
    else {
      this.delivery = new Delivery(this, deliveries[0]);
    }

    this.hasForegroundFetching = false;
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
    }
    else {
      const cartitem = new CartItem(this, data);
      this.cartitems.push(cartitem);
      const response = await API.request(API.ENDPOINTS.POST_CARTITEM(), data);
      // обновляем локальный cartitem после получения ответа от сервера
      cartitem.setId(response.data.id);
      cartitem.setCartId(response.data.cart_id);
    }
  }

  @action removeCartItem = async (productId) => {
    const product = this.products.find(p => p.id === productId);
    if (product.activeCartitem) {
      product.activeCartitem.decrement();
    }
  }

  @action pushOrder = () => {
    // console.log('Store pushOrder');
    this.x = 0;
  }

  getCartId() {
    return getCookie('cart_id');
  }

  @computed get maxProductPrice() {
    if (this.products.length === 0) return null;
    return this.products
      .sort((a, b) => a.maxPrice - b.maxPrice)[this.products.length - 1].maxPrice;
  }

  @computed get minProductPrice() {
    if (this.products.length === 0) return null;
    return this.products
      .sort((a, b) => a.minPrice - b.minPrice)[0].minPrice;
  }

  // @computed get userCartitems() {
  //   console.log('computed userCartitems this.getCartId(): ', this.getCartId());
  //   console.log('computed userCartitems cartitems: ', this.cartitems.find(i => i.id === 284));
  //   return this.user;
  //   // return this.cartitems.filter(item => item.cartId === this.getCartId());
  // }

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

  @computed get totalPriceWithDelivery() {
    return this.delivery.price ? this.totalPrice + this.delivery.price : this.totalPrice + 0;
  }

  @computed get totalItems() {
    return this.cartitems.filter(item => item.cartId === this.getCartId()).length;
  }

  @computed get totalWeight() {
    const filteredByCartId = this.cartitems.filter(item => item.cartId === this.getCartId());
    return filteredByCartId
      .reduce((sum, current) => {
        return sum + current.totalWeight;
      }, 0);
  }

  @computed get userCartitems() {
    return this.cartitems.filter(item => item.cartId === this.getCartId());
  }

  providers() {
    return {
      Cse: {
        name: '«КурьерСервисЭкспрес»',
        url: 'http://www.cse.ru/',
      },
      Kts: {
        name: '«Курьер Транс Сервис»',
        url: '',
      },
      UnionPost: {
        name: '«UNION POST»',
        url: '',
      },
      Latella: {
        name: '«ЛАТЭЛЛА»',
        url: '',
      },
      Tnt: {
        name: '«TNT»',
        url: '',
      },
      Pek: {
        name: '«ПЭК»',
        url: '',
      },
      Fox: {
        name: '«Фокс-Экспресс»',
        url: '',
      },
      Ups: {
        name: '«Ups»',
        url: '',
      },
      Dpd: {
        name: '«DPD»',
        url: '',
      },
      Dellin: {
        name: '«Деловые линии»',
        url: '',
      },
      ExpressRu: {
        name: '«Экспресс Точка Ру»',
        url: '',
      },
      Bringo: {
        name: '«Бринго»',
        url: '',
      },
      Dhl: {
        name: '«DHL»',
        url: '',
      },
      Spsr: {
        name: '«СПСР-ЭКСПРЕСС»',
        url: '',
      },
      CityExpress: {
        name: '«City Express»',
        url: '',
      },
      Cdek: {
        name: '«Курьерская компания СДЭК»',
        url: '',
      },
      Pony: {
        name: '«PONY EXPRESS»',
        url: '',
      },
      Peshkariki: {
        name: '«Пешкарики»',
        url: '',
      },
    };
  }

  @computed get toJS() {
    return toJS(this);
  }

}

const store = Store.get();
export default store;

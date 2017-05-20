/*
  products - начальный массив... может менятся только при запросе актуальных данных с сервера
    products служит локальным источником правды (все существующие продукты)
  computedProducts - вычесленный массив продуктов ... меняется в результате действий на сайте
    таких как фильтрация, сортировка и т.д.
*/


import { action, autorun, autorunAsync, observable, extendObservable, runInAction, computed, toJS, peek} from 'mobx';
import { getCookie } from '../utils';
import * as API from '../api';
import Product from './Product';
import User from './User';
import Property from './Property';
import Category from './Category';
import Image from './Image';
import CartItem from './CartItems';
import Delivery from './Delivery';
import uiStore from './UIStore';
import singleton from 'singleton';
import $ from 'jquery';


const initialData = {
  configs: [],
  categories: [],
  products: [],
  images: [],
  types: [],
  properties: [],
  cartitems: [],
  orders: [],
  delivery: {},
  user: null,
  hasForegroundFetching: false,
  hasBackgroundFetching: false,
  initial: false,
}


class Store extends singleton {

  constructor() {
    super();
    extendObservable(this, initialData);
    this.pullAll();

    autorun(() => {
      if (!uiStore.isLoading) {
        const path = window.location.pathname.split('/');
        // console.log('*** Store path : ', path);
        const mainCategory = this.categories.find(item => item.id === this.siteConfig.site_main_category);
        const mainCategorySlug = mainCategory ? mainCategory.slug : null;
        const catalogSlug = path[1] === 'catalog'
          ? path[2] : path[1].length === 0
            ? mainCategorySlug : null;
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

  @computed get productsByCategory() {  // FIXME: override save method in django model insted
    if (uiStore.catalogFilter !== null) {  // get all procucts fron descendants categories
      const catalogFilterObj = this.categories.find(c => uiStore.catalogFilter === c.id);
      const catIds = [uiStore.catalogFilter,
        ...catalogFilterObj ? [...catalogFilterObj.descendants.map(c => c.id)] : [],
      ];
      return observable(this.products.filter(product => 
        product.category.some(id => 
          catIds.includes(id))
      ));
    }
    return this.products;
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
    console.log('*** STORE start pullAll');
    uiStore.startLoading();
    this.hasForegroundFetching = true;

    if (window.initial_data) {
      this.configs = window.initial_data.configs;
      this.user = new User(window.initial_data.user);
      this.images.replace(window.initial_data.images.map(i => new Image(this, i)));
      this.types.replace(window.initial_data.types);
      this.properties.replace(window.initial_data.properties.map(prop => new Property(this, prop)));
      this.categories.replace(window.initial_data.categories.map(c => new Category(this, c)));
      this.products.replace(window.initial_data.products.map(product => new Product(this, product)));
      this.cartitems.replace(window.initial_data.cartitems.map(item => new CartItem(this, item)));
      if (window.initial_data.deliveries.length === 0) {
        this.delivery = new Delivery(this, {cart_id: this.getCartId()});
        const newDelivery = await API.request(API.ENDPOINTS.POST_DELIVERY(), {cart_id: this.getCartId(), price: 0});
        this.delivery.setId(newDelivery.id);
      }
      else {
        this.delivery = new Delivery(this, window.initial_data.deliveries[0]);
      }
    }

    setTimeout(() => {
      this.hasForegroundFetching = false;
    }, 1000);
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

  @computed get siteConfig() {
    const byDomain = this.configs.find(item => item.site.domain === document.domain); 
    if (byDomain) return byDomain;
    return this.configs[this.configs.length - 1]; 
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

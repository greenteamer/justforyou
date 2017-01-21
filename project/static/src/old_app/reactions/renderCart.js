import { store } from '../stores';


const renderCart = () => {
  return `<li id="fat-menu" class="dropdown">
      <i class="ion-ios-cart cart-icon"><span class="badge">${ store.totalItems }</span></i>
      <div class="price-block">
        <p>Сумма:</p>
        <p class="price">${store.totalPrice} р.</p>
      </div>
    </li>`;
};


export default renderCart;

import $ from 'jquery';


const cartbox = (price, count) => {
  const container = $(`<li id="fat-menu" class="dropdown">
    <i class="ion-ios-cart cart-icon"><span class="badge">${ count }</span></i>
    <div class="price-block">
      <p>Сумма:</p>
      <p class="price">${price} р.</p>
    </div>
  </li>`);
  return container;
}


export const renderCartbox = (price, count) => {
  $('#cart').html(cartbox(price, count));
}

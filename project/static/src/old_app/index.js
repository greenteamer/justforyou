import $ from 'jquery';
import renderCart from './reactions/renderCart';
import addToCart from './reactions/addToCart';


console.log('test index.js');

$('#cart').html(renderCart());

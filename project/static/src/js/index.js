import Swiper from 'swiper';
import $ from 'jquery';


const mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 5,

  // If we need pagination
  // pagination: '.swiper-pagination',

  // Navigation arrows
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  // And if we need scrollbar
  // scrollbar: '.swiper-scrollbar',
});

const SliderSwiper = new Swiper('.swiper-container2', {
  // Optional parameters
  pagination: '.swiper-pagination',
  paginationClickable: true,

  // Navigation arrows
  // And if we need scrollbar
  // scrollbar: '.swiper-scrollbar',
});

// const SliderSwiper = new Swiper('#front-slider', {
//   // Optional parameters
//   pagination: '.swiper-pagination',
//   paginationClickable: true,

//   // Navigation arrows
//   // And if we need scrollbar
//   // scrollbar: '.swiper-scrollbar',
// });


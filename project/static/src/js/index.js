import Swiper from 'swiper';
import $ from 'jquery';


const mySwiper = new Swiper('.swiper1', {
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

const SliderSwiper = new Swiper('.swiper2', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
});

const SliderSwiper3 = new Swiper('.swiper3', {
  pagination: '.swiper-pagination',
  loop: true,
  slidesPerView: 3,
  paginationClickable: true,
});

// const SliderSwiper = new Swiper('#front-slider', {
//   // Optional parameters
//   pagination: '.swiper-pagination',
//   paginationClickable: true,

//   // Navigation arrows
//   // And if we need scrollbar
//   // scrollbar: '.swiper-scrollbar',
// });


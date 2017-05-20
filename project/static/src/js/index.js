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
  nextButton: '.swiper-button-next2',
  prevButton: '.swiper-button-prev2',
  // And if we need scrollbar
  // scrollbar: '.swiper-scrollbar',
});

const SliderSwiper = new Swiper('.swiper2', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  loop: true,
  autoplay: 4000,
});

const SliderSwiper3 = new Swiper('.swiper3', {
  pagination: '.swiper-pagination',
  loop: true,
  slidesPerView: 3,
  paginationClickable: true,
});

var galleryTop = new Swiper('.gallery-top', {
  nextButton: '.swiper-button-next1',
  prevButton: '.swiper-button-prev1',
  spaceBetween: 10,
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 'auto',
  touchRatio: 0.2,
  slideToClickedSlide: true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;

// const SliderSwiper = new Swiper('#front-slider', {
//   // Optional parameters
//   pagination: '.swiper-pagination',
//   paginationClickable: true,

//   // Navigation arrows
//   // And if we need scrollbar
//   // scrollbar: '.swiper-scrollbar',
// });


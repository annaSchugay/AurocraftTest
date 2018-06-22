'use strict';

//main width
if (screen.width > 980) {
  document.querySelector('main').style.width = document.body.clientWidth - 327 + 'px';
}

//slider

var container = document.querySelector('.container');
var slidesContainer = document.querySelector('.slides-block ul');
var allSlides = slidesContainer.querySelectorAll('li');
var slidesButtons = document.querySelector('.slider-buttons');
var slideButtonLeft = slidesButtons.querySelector('.arrow-to-left');
var slideButtonRight = slidesButtons.querySelector('.arrow-to-right');
var slideNumber = document.querySelector('.slide-number');
var activeSlide = slideNumber.querySelector('.active');
var totalCountSlides = slideNumber.querySelector('.total-count-slides');
var closeButton = document.querySelector('.close-button');
var modalWindow = document.querySelectorAll('.modal-window');
var modalWindowNews = document.querySelectorAll('.news');
var newsButton = document.querySelector('.news-button');
var count = 0;
var slideIndex = 1;

for (var i = 0; i < allSlides.length; i++) {
  count += i;
}

totalCountSlides.innerHTML = count;

showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i = void 0;
  if (n > allSlides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = allSlides.length;
  }
  for (i = 0; i < allSlides.length; i++) {
    allSlides[i].style.opacity = 0;
  }
  allSlides[slideIndex - 1].style.opacity = 1;
  activeSlide.innerHTML = allSlides[slideIndex - 1].value;
}

slideButtonLeft.addEventListener('click', function () {
  plusDivs(-1);
});

slideButtonRight.addEventListener('click', function () {
  plusDivs(+1);
});

newsButton.addEventListener('click', function () {
  modalWindowNews.classList.add('fade-in');
});

closeButton.addEventListener('click', function () {
  for (var _i = 0; _i < modalWindow.length; _i++) {
    modalWindow[_i].classList.remove('fade-in');
  }

  container.style.filter = "blur(0)";
});

console.log('general');
'use strict';

console.log('0000');
//# sourceMappingURL=index.js.map

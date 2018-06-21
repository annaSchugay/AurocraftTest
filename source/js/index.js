//main width

document.querySelector('main').style.width = (document.body.clientWidth - 327) + 'px';

//slider

const slidesContainer = document.querySelector('.slides-block ul');
const allSlides = slidesContainer.querySelectorAll('li');
const slidesButtons = document.querySelector('.slider-buttons');
const slideButtonLeft = slidesButtons.querySelector('.arrow-to-left');
const slideButtonRight = slidesButtons.querySelector('.arrow-to-right');
const slideNumber = document.querySelector('.slide-number');
const activeSlide = slideNumber.querySelector('.active');
const totalCountSlides = slideNumber.querySelector('.total-count-slides');

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  // var x = document.getElementsByClassName("mySlides");
  if (n > allSlides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = allSlides.length}
  for (i = 0; i < allSlides.length; i++) {
    allSlides[i].style.opacity = 0;
  }
  allSlides[slideIndex-1].style.opacity= 1;
  activeSlide.innerHTML = allSlides[slideIndex-1].value;
}

slideButtonLeft.addEventListener('click', function () {
  plusDivs(-1);
});

slideButtonRight.addEventListener('click', function () {
  plusDivs(+1);
});

console.log();

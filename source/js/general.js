//main width
if (screen.width > 980) {
  document.querySelector('main').style.width = (document.body.clientWidth - 327) + 'px';
}

//slider

const container = document.querySelector('.container');
const slidesContainer = document.querySelector('.slides-block ul');
const allSlides = slidesContainer.querySelectorAll('li');
const slidesButtons = document.querySelector('.slider-buttons');
const slideButtonLeft = slidesButtons.querySelector('.arrow-to-left');
const slideButtonRight = slidesButtons.querySelector('.arrow-to-right');
const slideNumber = document.querySelector('.slide-number');
const activeSlide = slideNumber.querySelector('.active');
const totalCountSlides = slideNumber.querySelector('.total-count-slides');
const closeButton = document.querySelector('.close-button');
const modalWindow = document.querySelectorAll('.modal-window');
const modalWindowNews = document.querySelectorAll('.news');
const newsButton = document.querySelector('.news-button');
let count = 0;
let slideIndex = 1;

for (var i = 0; i < allSlides.length; i++) {
  count += i;
}

totalCountSlides.innerHTML = count;

showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  let i;
  if (n > allSlides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = allSlides.length
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
  for (let i = 0; i < modalWindow.length; i++) {
    modalWindow[i].classList.remove('fade-in');
  }

  container.style.filter = "blur(0)";
});

console.log(`general`);
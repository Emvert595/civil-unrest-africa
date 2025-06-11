// script.js

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let isAnimating = false;

function animateSlide(slide) {
  const text = slide.querySelector('.text');
  const visual = slide.querySelector('.visual');
  if (text && visual) {
    gsap.fromTo(text, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    gsap.fromTo(visual, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
  }
}

function showSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.style.zIndex = i === index ? 10 : 0;
  });
  slides[index].classList.add('active');
  animateSlide(slides[index]);
}

function nextSlide() {
  if (isAnimating || currentSlide >= totalSlides - 1) return;
  isAnimating = true;
  currentSlide++;
  showSlide(currentSlide);
  setTimeout(() => isAnimating = false, 1200);
}

function prevSlide() {
  if (isAnimating || currentSlide <= 0) return;
  isAnimating = true;
  currentSlide--;
  showSlide(currentSlide);
  setTimeout(() => isAnimating = false, 1200);
}

window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    nextSlide();
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    prevSlide();
  }
});

// Start by showing the first slide
showSlide(currentSlide);

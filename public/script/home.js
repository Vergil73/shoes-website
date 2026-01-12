const sliderPic = document.querySelectorAll('.slider-pic');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

let currentSlide = 0;
let timer;

function addActiveClass() {
    sliderPic.forEach((pic, i) => {
        if (i === currentSlide) {
            pic.classList.add('active');
        } else {
            pic.classList.remove('active');
        }
    });
}

function autoPlay() {
    clearTimeout(timer);

    if (currentSlide >= sliderPic.length) {
        currentSlide = 0;
    }

    addActiveClass();
    
    currentSlide++;

    timer = setTimeout(autoPlay, 6000); 
}

next.addEventListener('click', () => {
    
    autoPlay();
});

prev.addEventListener('click', () => {
    clearTimeout(timer);
    
    currentSlide = currentSlide - 2;

    if (currentSlide < 0) {
        currentSlide = sliderPic.length - 1;
    }

   
    autoPlay();
});

autoPlay();
$(document).ready(function () {
    // console.log('hello world'); // test

    $('.m-slider').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 569,
                settings: {
                    centerMode: true,
                }
            },
            {
                breakpoint: 568,
                settings: {
                    centerMode: true,
                }
            }
        ]
    });

    $('.r-slider').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000,
        slidesToShow: 1,
        centerMode: true,
        fade: true,
        pauseOnHover: false
    });

    /**
     * visibility observer for sliders
     * **/

    const sliderMusic = document.querySelector('#sliderMusic');
    const sliderRetouch = document.querySelector('#sliderRetouch');

    const options = {
        rootMargin: '0px',
        threshold: [0.5 ]
    };

    const trueCallback = function(entries, observer) {
        entries.forEach((entry) => {
            // получаем свойства, которые доступны в объекте entry
            const { target, isIntersecting } = entry;
            const
                sliderId = target.id,
                autoplay = isIntersecting;

            // console.log(sliderId, autoplay)
            if( autoplay ) {
                // добавляем класс, когда элемент входит в область наблюдения
                $('#'+ sliderId).slick('slickPlay');
                // console.log(sliderId, 'slickPlay')
            } else {
                // удаляем класс, когда элемент из неё выходит
                $('#'+ sliderId).slick('slickPause');
                // console.log(sliderId, 'slickPause')
            }
        });
    };

    // const observer = new IntersectionObserver( trueCallback, options );
    // observer.observe( sliderMusic );
    // observer.observe( sliderRetouch );


});
const body = document.querySelector('body');
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // код для мобильных устройств
    body.classList.add('mobile')
} else {
    // код для обычных устройств
}


/** toTopBtn check visibility function **/
var sectionMain = document.querySelector('.section--main');
var toTopBtn = document.querySelector('.to-top');

var Visible = function (target) {
    // Все позиции элемента
    var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа

        if(target === sectionMain){
            toTopBtn.classList.remove('active');
        }

    } else {
        if(target === sectionMain){
            toTopBtn.classList.add('active')
        }
    }
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function() {
    Visible (sectionMain);
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
Visible (sectionMain);



/* кнопка наверх */
document.querySelector('.to-top').onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
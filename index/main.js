let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const intervalTime = 3000;
let autoSlideInterval;

function showSlide(index) {
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
    });

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
    const offset = -100 * currentIndex;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function changeSlide(n) {
    showSlide(currentIndex + n);
}

function currentSlide(n) {
    showSlide(n);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, intervalTime);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

showSlide(currentIndex);
startAutoSlide();


// Back to top
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) { // 當滾動超過 300 像素時顯示按鈕
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function (event) {
        event.preventDefault(); // 防止跳轉
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const logoimg = document.getElementById('logoimg');

    // 滾動後改變navbar顏色及圖片
    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
            logoimg.src = '../img/penrote-logo-white.png';
        } else {
            navbar.classList.remove('scrolled');
            logoimg.src = '../img/penrote-logo-red.png';
        }
    });

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const product = document.querySelector('.products');

    function setupIntersectionObserver() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.3 // 當元素的 30% 進入視口時觸發
        });

        if (product) {
            observer.observe(product);
        }
    }

    setupIntersectionObserver();
});


    
document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('#input, #menu-input');
    const searchButtons = document.querySelectorAll('.search-btn');

    searchInputs.forEach(input => {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch(input);
            }
        });
    });

   
    searchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            performSearch(input);
        });
    });

    function performSearch(input) {
        const query = input.value.trim();
        if (query) {
            window.location.href = `../product/product.html?search=${encodeURIComponent(query)}`;
        }
    }
});


new Vue({
    el: '#app',
    data: {
        categories: [],
        categoryImages: {
            "1": "../img/writing.jpg",
            "2": "../img/correction.jpg",
            "3": "../img/artmaterials.jpg",
            "4": "../img/bindingpasting.jpg",
            "5": "../img/officesupplies.jpg",
            "6": "../img/organize.jpg",
            "7": "../img/measuring.jpg",
            "8": "../img/theme.jpg",
            "9": "../img/customized.jpg"
        }
    },
    mounted() {
        fetch('../categories.json')
            .then(response => response.json())
            .then(data => {
                this.categories = data.categories.filter(category => !category.parent);
            })
            .catch(error => console.error('Error loading categories JSON:', error));
    },
    methods: {
        goToProductPage(categoryId) {
            window.location.href = `../product/product.html?category=${categoryId}`;
        }
    }
});


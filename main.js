let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const intervalTime = 3000; // Time in milliseconds between slide changes (3 seconds)
let autoSlideInterval;

// Show the slide based on the index
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

// Change to the next or previous slide
function changeSlide(n) {
    showSlide(currentIndex + n);
}

// Set the current slide based on the dot clicked
function currentSlide(n) {
    showSlide(n);
}

// Start the automatic sliding
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, intervalTime);
}

// Stop the automatic sliding
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Initialize carousel and start auto-slide
showSlide(currentIndex);
startAutoSlide();


// Back to top button functionality
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
            behavior: 'smooth' // 平滑滾動
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const logoimg = document.getElementById('logoimg');

    // Scroll event for header color change
    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
            logoimg.src = 'img/penrote-logo-white.png';
        } else {
            navbar.classList.remove('scrolled');
            logoimg.src = 'img/penrote-logo-red.png';
        }
    });

    // Click event for menu toggle
    menuToggle.addEventListener('click', function () {
        console.log('Menu toggle clicked'); // Debugging
        menu.classList.toggle('active'); // Toggle menu visibility
        menuToggle.classList.toggle('active'); // Toggle menu icon animation
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
    const searchInputs = document.querySelectorAll('#input, #menu-input'); // 所有搜索输入框
    const searchButtons = document.querySelectorAll('.search-btn'); // 所有搜索按钮

    // 监听输入框的 Enter 键事件
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch(input);
            }
        });
    });

    // 监听所有搜索按钮的点击事件
    searchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling; // 获取与按钮关联的输入框
            performSearch(input);
        });
    });

    function performSearch(input) {
        const query = input.value.trim();
        if (query) {
            // 导向商品页面并传递搜索查询参数
            window.location.href = `product.html?search=${encodeURIComponent(query)}`;
        }
    }
});


new Vue({
    el: '#app',
    data: {
        categories: [], // 存储类别数据
        categoryImages: {
            "1": "img/writing.jpg",
            "2": "img/correction.jpg",
            "3": "img/artmaterials.jpg",
            "4": "img/bindingpasting.jpg",
            "5": "img/officesupplies.jpg",
            "6": "img/organize.jpg",
            "7": "img/measuring.jpg",
            "8": "img/theme.jpg",
            "9": "img/customized.jpg"
        }
    },
    mounted() {
        // 加载类别数据
        fetch('categories.json')
            .then(response => response.json())
            .then(data => {
                this.categories = data.categories.filter(category => !category.parent);
            })
            .catch(error => console.error('Error loading categories JSON:', error));
    },
    methods: {
        goToProductPage(categoryId) {
            // 導向商品頁，並傳遞所選的類別 ID
            window.location.href = `product.html?category=${categoryId}`;
        }
    }
});


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

// Navbar color change on scroll
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('header');
    const fontcolor = document.getElementById('nav');
    const search = document.getElementById('search');
    const logoimg = document.getElementById('logoimg');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
            fontcolor.classList.add('scrolled');
            search.classList.add('scrolled');
            logoimg.src = 'img/penrote-logo-white.png';
        } else {
            navbar.classList.remove('scrolled');
            fontcolor.classList.remove('scrolled');
            search.classList.remove('scrolled');
            logoimg.src = 'img/penrote-logo-red.png';
        }
    });
});

// Handle scroll-triggered animation
document.addEventListener('DOMContentLoaded', () => {
    const product = document.querySelector('.products');

    function handleScroll() {
        const productRect = product.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.7;

        if (productRect.top < triggerPoint && productRect.bottom > 0) {
            product.classList.add('visible');
            setTimeout(() => {
                product.classList.remove('visible');
                requestAnimationFrame(() => {
                    product.classList.add('visible');
                });
            }, 50);
        } else {
            product.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初次載入時檢查
});

new Vue({
    el: '#search',
    data: {
        searchQuery: '' // 存储搜索查询
    },
    methods: {
        performSearch() {
            if (this.searchQuery.trim()) {
                // 使用 encodeURIComponent 对搜索查询进行编码
                const query = encodeURIComponent(this.searchQuery.trim());
                window.location.href = `product.html?search=${query}`;
            }
        }
    },
    mounted() {
        // 监听输入框的 keypress 事件
        this.$refs.input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // 防止默认行为（如提交表单）
                this.performSearch(); // 执行搜索
            }
        });

        // 监听搜索按钮的点击事件
        document.querySelector('.search-btn').addEventListener('click', () => {
            this.performSearch(); // 执行搜索
        });
    }
});

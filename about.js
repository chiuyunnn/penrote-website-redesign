document.addEventListener('DOMContentLoaded', function () {
    const about = document.querySelector('.about');

    function handleScroll() {
        const aboutRect = about.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (aboutRect.top < viewportHeight && aboutRect.bottom > 0) {
            about.classList.add('visible');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初次載入時檢查
});

document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    // 顯示或隱藏按鈕
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { // 當滾動超過 50 像素時顯示按鈕
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // 點擊按鈕平滑滾動回到頂部
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
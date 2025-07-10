// Back to top
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
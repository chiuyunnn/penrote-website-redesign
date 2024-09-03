document.addEventListener('DOMContentLoaded', function () {
    const news = document.querySelector('.news-article');

    function handleScroll() {
        const newsRect = news.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (newsRect.top < viewportHeight && newsRect.bottom > 0) {
            news.classList.add('visible');
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


document.addEventListener('DOMContentLoaded', () => {
    const articleList = document.querySelector('.article-list');
    const modal = document.getElementById('articleModal');
    const closeButton = document.querySelector('.close');
    const modalTitle = document.querySelector('.modal-title');
    const modalArticles = document.querySelector('.modal-articles');
    const modalThumbnails = document.querySelector('.modal-thumbnails');

    function showModal(article) {
        modalTitle.textContent = article.title;
        modalArticles.innerHTML = ''; // 清空现有的内容

        // 处理 content 数组中的内容
        article.content.forEach(item => {
            if (item.type === 'text') {
                const div = document.createElement('div');
                div.innerHTML = item.content;
                modalArticles.appendChild(div);
            } else if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.pic; // 更新为 pic
                img.classList.add('modal-content-image');
                modalArticles.appendChild(img);
            }
        });

        modalThumbnails.innerHTML = ''; // 清空现有的缩略图

        // 处理 thumbnails 数组中的缩略图
        article.thumbnails.forEach(pic => { // 更新为 pic
            const img = document.createElement('img');
            img.src = pic; // 更新为 pic
            img.classList.add('modal-thumbnail');
            modalThumbnails.appendChild(img);
        });

        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    fetch('articles.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(article => {
                const articleItem = document.createElement('div');
                articleItem.classList.add('article-item');
                articleItem.dataset.id = article.id;
                articleItem.innerHTML = `
                    <img src="${article.thumbnails[0]}" class="article-thumbnail" alt="Thumbnail">
                    <h2 class="article-title">${article.title}</h2>
                    <p class="date">${article.date || ''}</p>
                    <p class="readmore">閱讀更多</p>
                `;
                articleList.appendChild(articleItem);
            });

            articleList.addEventListener('click', (event) => {
                const articleItem = event.target.closest('.article-item');
                if (articleItem) {
                    const articleId = articleItem.dataset.id;
                    const article = data.find(item => item.id == articleId);
                    if (article) {
                        showModal(article);
                    }
                }
            });
        })
        .catch(error => console.error('Error loading JSON:', error));

    closeButton.addEventListener('click', hideModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
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


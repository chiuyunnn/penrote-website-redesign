document.addEventListener('DOMContentLoaded', function () {
    const news = document.querySelector('.product_detail');

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

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { // 當滾動超過 50 像素時顯示按鈕
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

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('input');
    const searchButton = document.querySelector('.search-btn');

    // 監聽輸入框的 Enter 鍵事件
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // 監聽搜尋按鈕的點擊事件
    searchButton.addEventListener('click', () => {
        performSearch();
    });

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // 導向商品頁並傳遞搜尋查詢參數
            window.location.href = `product.html?search=${encodeURIComponent(query)}`;
        }
    }
});
 

document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbContainer = document.querySelector('.breadcrumb');

    // 加载分类数据
    function fetchCategories() {
        return fetch('categories.json')
            .then(response => response.json())
            .then(data => data.categories);
    }

    // 根据分类 ID 查找分类数据
    function findCategoryById(categories, id) {
        return categories.find(cat => cat.id === id);
    }

    // 根据分类 ID 生成面包屑路径
    function generateBreadcrumbPath(categories, categoryId) {
        let path = [];
        let currentCategoryId = categoryId;

        while (currentCategoryId) {
            const category = findCategoryById(categories, currentCategoryId);
            if (category) {
                path.unshift(category);
                currentCategoryId = category.parent;
            } else {
                currentCategoryId = null;
            }
        }
        return path;
    }

    // 生成面包屑导航
    function generateBreadcrumb(categories, product) {
        if (product && product.category) {
            const categoryIds = product.category.split(',');
            let mainCategory = null;
            let subCategory = null;

            // 找到第一个有效的主分类和子分类
            for (let id of categoryIds) {
                const path = generateBreadcrumbPath(categories, id);
                if (path.length > 0) {
                    if (!mainCategory) {
                        mainCategory = path[0]; // 第一层级的分类
                    }
                    if (path.length > 1) {
                        subCategory = path[1]; // 第二层级的分类
                        break; // 只取第一个子分类
                    }
                }
            }

            // 清空当前 breadcrumb 内容
            breadcrumbContainer.innerHTML = '<li class="breadcrumb-item"><a href="index.html">首頁</a></li>';

            // 显示主分类
            if (mainCategory) {
                breadcrumbContainer.innerHTML += `<li class="breadcrumb-item"><a href="product.html?category=${mainCategory.id}">${mainCategory.name}</a></li>`;
            } else {
                breadcrumbContainer.innerHTML += '<li class="breadcrumb-item active" aria-current="page">主分类缺失</li>';
            }

            // 显示子分类
            if (subCategory) {
                breadcrumbContainer.innerHTML += `<li class="breadcrumb-item"><a href="product.html?category=${subCategory.id}">${subCategory.name}</a></li>`;
            } else {
                breadcrumbContainer.innerHTML += '<li class="breadcrumb-item active" aria-current="page">子分类缺失</li>';
            }

            // 显示商品名称
            if (product.name) {
                breadcrumbContainer.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${product.name}</li>`;
            } else {
                breadcrumbContainer.innerHTML += '<li class="breadcrumb-item active" aria-current="page">商品信息缺失</li>';
            }
        } else {
            breadcrumbContainer.innerHTML = '<li class="breadcrumb-item"><a href="index.html">首頁</a></li><li class="breadcrumb-item active" aria-current="page">商品信息缺失</li>';
        }
    }

    // 获取产品数据
    function fetchProduct() {
        const urlParams = new URLSearchParams(window.location.search);
        const model = urlParams.get('model');
        return fetch('products.json')
            .then(response => response.json())
            .then(products => products.find(item => item.model === model));
    }

    // 主函数
    Promise.all([fetchCategories(), fetchProduct()])
        .then(([categories, product]) => {
            console.log('Fetched Categories:', categories); // 调试输出分类数据
            console.log('Fetched Product:', product); // 调试输出产品数据
            generateBreadcrumb(categories, product);
        })
        .catch(error => console.error('Error loading data:', error));
});


new Vue({
    el: '#app',
    data: {
        product: null, // 用于存储当前显示的产品信息
        activeThumbnailIndex: 0, // 活动缩略图索引
        activeIndexes: [0] // 默认打开的手风琴项索引
    },
    mounted() {
        this.loadProduct();
    },
    methods: {
        loadProduct() {
            const urlParams = new URLSearchParams(window.location.search);
            const model = urlParams.get('model');

            if (!model) {
                console.error('Product model not specified.');
                return;
            }

            fetch('products.json')
                .then(response => response.json())
                .then(data => {
                    this.product = data.find(item => item.model === model);
                    if (this.product) {
                        // 在数据加载后设置标题
                        this.$nextTick(() => {
                            this.initializeImageGallery();
                            document.title = this.product.name; // 设置标题
                        });
                    } else {
                        console.error('Product not found.');
                    }
                })
                .catch(error => console.error('Error loading products JSON:', error));
        },
        initializeImageGallery() {
            const imageScroll = document.querySelector('.image-scroll');
            const thumbnailsContainer = document.querySelector('.thumbnails');

            if (!this.product || !this.product.images || this.product.images.length === 0) {
                console.error('No images available for the product.');
                return;
            }

            thumbnailsContainer.innerHTML = '';
            imageScroll.innerHTML = '';

            this.product.images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image;
                thumbnail.alt = `Thumbnail ${index}`;
                thumbnail.style.width = '120px';
                thumbnail.dataset.index = index;

                thumbnail.addEventListener('click', () => {
                    this.scrollToImage(index);
                    this.activeThumbnailIndex = index;
                });

                thumbnailsContainer.appendChild(thumbnail);

                const img = document.createElement('img');
                img.src = image;
                img.alt = `Product Image ${index}`;
                imageScroll.appendChild(img);
            });

            const updateActiveThumbnail = () => {
                const scrollTop = imageScroll.scrollTop;
                const imageHeight = imageScroll.scrollHeight / this.product.images.length;
                const activeIndex = Math.round(scrollTop / imageHeight);

                thumbnailsContainer.querySelectorAll('img').forEach((thumb, index) => {
                    if (index === activeIndex) {
                        thumb.classList.add('active');
                        thumb.classList.remove('inactive');
                    } else {
                        thumb.classList.remove('active');
                        thumb.classList.add('inactive');
                    }
                });
            };

            imageScroll.addEventListener('scroll', updateActiveThumbnail);
            updateActiveThumbnail();
        },
        scrollToImage(index) {
            const imageScroll = document.querySelector('.image-scroll');
            const images = imageScroll.querySelectorAll('img');
            if (index < 0 || index >= images.length) return;

            images[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        },
        toggle(index) {
            // Toggle the index in the activeIndexes array
            if (this.activeIndexes.includes(index)) {
                this.activeIndexes = this.activeIndexes.filter(i => i !== index);
            } else {
                this.activeIndexes.push(index);
            }
        }
    }
});

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
    handleScroll();
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
 

document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbContainer = document.querySelector('.breadcrumb');

    function fetchCategories() {
        return fetch('../categories.json')
            .then(response => response.json())
            .then(data => data.categories);
    }

    function findCategoryById(categories, id) {
        return categories.find(cat => cat.id === id);
    }

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

    function generateBreadcrumb(categories, product) {
        if (product && product.category) {
            const categoryIds = product.category.split(',');
            let mainCategory = null;
            let subCategory = null;

            for (let id of categoryIds) {
                const path = generateBreadcrumbPath(categories, id);
                if (path.length > 0) {
                    if (!mainCategory) {
                        mainCategory = path[0];
                    }
                    if (path.length > 1) {
                        subCategory = path[1];
                        break;
                    }
                }
            }

            breadcrumbContainer.innerHTML = '<li class="breadcrumb-item"><a href="../index/index.html">首頁</a></li>';

            if (mainCategory) {
                breadcrumbContainer.innerHTML += `<li class="breadcrumb-item"><a href="../product/product.html?category=${mainCategory.id}">${mainCategory.name}</a></li>`;
            } else {
                breadcrumbContainer.innerHTML += '<li class="breadcrumb-item active" aria-current="page">主分類缺失</li>';
            }

            if (subCategory) {
                breadcrumbContainer.innerHTML += `<li class="breadcrumb-item"><a href="../product/product.html?category=${subCategory.id}">${subCategory.name}</a></li>`;
            } else {
                breadcrumbContainer.innerHTML += '<li class="breadcrumb-item active" aria-current="page">子分類缺失</li>';
            }

            if (product.name) {
                breadcrumbContainer.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${product.name}</li>`;
            } else {
                breadcrumbContainer.innerHTML += '<li class="breadcrumb-item active" aria-current="page">商品資訊缺失</li>';
            }
        } else {
            breadcrumbContainer.innerHTML = '<li class="breadcrumb-item"><a href="../index/index.html">首頁</a></li><li class="breadcrumb-item active" aria-current="page">商品資訊缺失</li>';
        }
    }

    function fetchProduct() {
        const urlParams = new URLSearchParams(window.location.search);
        const model = urlParams.get('model');
        return fetch('../products.json')
            .then(response => response.json())
            .then(products => products.find(item => item.model === model));
    }

    Promise.all([fetchCategories(), fetchProduct()])
        .then(([categories, product]) => {
            console.log('Fetched Categories:', categories);
            console.log('Fetched Product:', product);
            generateBreadcrumb(categories, product);
        })
        .catch(error => console.error('Error loading data:', error));
});


new Vue({
    el: '#app',
    data: {
        product: null, // 用於儲存當前顯示的產品
        activeThumbnailIndex: 0, // 縮圖
        activeIndexes: [0] // 默認開啟第一個手風琴
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

            fetch('../products.json')
                .then(response => response.json())
                .then(data => {
                    this.product = data.find(item => item.model === model);
                    if (this.product) {

                        this.$nextTick(() => {
                            this.initializeImageGallery();
                            document.title = this.product.name;
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
            if (this.activeIndexes.includes(index)) {
                this.activeIndexes = this.activeIndexes.filter(i => i !== index);
            } else {
                this.activeIndexes.push(index);
            }
        }
    }
});

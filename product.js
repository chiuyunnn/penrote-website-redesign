document.addEventListener('DOMContentLoaded', function () {
    const news = document.querySelector('.all_products');

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


// new Vue({
//     el: '#app',
//     data: {
//         products: [], // 商品数据
//         selectedCategory: '', // 选中的类别
//         categories: [], // 存储类别数据
//         searchQuery: '', // 搜索查询
//         filteredProducts: [] // 过滤后的商品数据
//     },
//     computed: {
//         filteredProducts() {
//             if (!this.products.length) return [];

//             let filteredByCategory = this.selectedCategory
//                 ? this.products.filter(product =>
//                     product.category.split(',').includes(this.selectedCategory)
//                 )
//                 : this.products;

//             return filteredByCategory.filter(product =>
//                 product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//                 product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
//             );
//         }
//     },
//     mounted() {
//         this.loadCategories();
//         this.loadProducts();
//         this.bindSearchEvents();
//     },
//     methods: {
//         loadCategories() {
//             fetch('categories.json')
//                 .then(response => response.json())
//                 .then(data => {
//                     this.categories = data.categories;
//                     this.generateMenu(data.categories);
//                     this.setActiveMenu();
//                     this.generateBreadcrumb();
//                 })
//                 .catch(error => console.error('Error loading categories JSON:', error));
//         },
//         loadProducts() {
//             fetch('products.json')
//                 .then(response => response.json())
//                 .then(data => {
//                     this.products = data;
//                     this.filterProducts();
//                 })
//                 .catch(error => console.error('Error loading products JSON:', error));
//         },
//         bindSearchEvents() {
//             const input = document.getElementById('input');
//             const searchButton = document.querySelector('.search-btn');

//             input.addEventListener('keypress', (event) => {
//                 if (event.key === 'Enter') {
//                     this.performSearch();
//                 }
//             });

//             searchButton.addEventListener('click', () => {
//                 this.performSearch();
//             });
//         },
//         performSearch() {
//             this.searchQuery = document.getElementById('input').value;
//             this.filterProducts(); // 过滤产品
//             this.generateBreadcrumb(); // 更新面包屑导航
//         },
//         filterProducts() {
//             this.$nextTick(() => {
//                 if (this.selectedCategory) {
//                     this.filteredProducts = this.products.filter(product =>
//                         product.category.split(',').includes(this.selectedCategory)
//                     );
//                 } else {
//                     this.filteredProducts = this.products;
//                 }
//                 this.filteredProducts = this.filteredProducts.filter(product =>
//                     product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//                     product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
//                 );
//                 console.log('Filtered products:', this.filteredProducts); // 调试输出
//             });
//         },
//         generateMenu(categories) {
//             const menuContainer = document.getElementById('submenu');
//             menuContainer.innerHTML = ''; // 清空现有菜单
//             const menu = document.createElement('ul');
//             menu.classList.add('category');
//             const topLevelCategories = categories.filter(category => !category.parent);
//             topLevelCategories.forEach(category => {
//                 const li = document.createElement('li');
//                 li.classList.add('menu-item');
//                 li.innerHTML = `${category.name} <i class="fa fa-chevron-down toggle-arrow"></i>`;
//                 li.dataset.category = category.id;

//                 const subcategoryUl = document.createElement('ul');
//                 subcategoryUl.classList.add('subcategory');

//                 const subcategories = categories.filter(cat => cat.parent === category.id);
//                 subcategories.forEach(subcategory => {
//                     const subLi = document.createElement('li');
//                     subLi.textContent = subcategory.name;
//                     subLi.dataset.category = subcategory.id;
//                     subcategoryUl.appendChild(subLi);
//                 });

//                 li.appendChild(subcategoryUl);
//                 menu.appendChild(li);
//             });

//             menuContainer.appendChild(menu);
//             this.bindMenuEvents();
//         },
//         bindMenuEvents() {
//             const menuItems = document.querySelectorAll('.menu-item');
//             menuItems.forEach(item => {
//                 item.addEventListener('click', (event) => {
//                     event.stopPropagation();

//                     menuItems.forEach(otherItem => {
//                         if (otherItem !== item) {
//                             otherItem.classList.remove('active');
//                             const otherSubcategory = otherItem.querySelector('.subcategory');
//                             if (otherSubcategory) {
//                                 otherSubcategory.classList.remove('show');
//                                 otherSubcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
//                             }
//                             const otherArrowIcon = otherItem.querySelector('.toggle-arrow');
//                             if (otherArrowIcon) {
//                                 otherArrowIcon.classList.remove('open');
//                             }
//                         }
//                     });

//                     item.classList.toggle('active');
//                     const subcategory = item.querySelector('.subcategory');
//                     const arrowIcon = item.querySelector('.toggle-arrow');
//                     if (subcategory) {
//                         subcategory.classList.toggle('show');
//                         if (item.classList.contains('active')) {
//                             subcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
//                         }
//                     }
//                     if (arrowIcon) {
//                         arrowIcon.classList.toggle('open');
//                     }

//                     this.selectedCategory = item.dataset.category;
//                     this.filterProducts();
//                     this.updateUrlAndBreadcrumb(item.dataset.category);
//                 });
//             });

//             document.querySelectorAll('.subcategory li').forEach(li => {
//                 li.addEventListener('click', (event) => {
//                     event.stopPropagation();

//                     li.parentElement.querySelectorAll('li').forEach(item => item.classList.remove('active'));

//                     li.classList.add('active');

//                     this.selectedCategory = li.dataset.category;
//                     this.filterProducts();
//                     this.updateUrlAndBreadcrumb(li.dataset.category);
//                 });
//             });

//             document.addEventListener('click', () => {
//                 const menuItems = document.querySelectorAll('.menu-item');
//                 menuItems.forEach(item => {
//                     const subcategory = item.querySelector('.subcategory');
//                     if (subcategory) {
//                         subcategory.classList.remove('show');
//                     }
//                     item.classList.remove('active');
//                     const arrowIcon = item.querySelector('.toggle-arrow');
//                     if (arrowIcon) {
//                         arrowIcon.classList.remove('open');
//                     }
//                 });
//             });
//         },
//         setActiveMenu() {
//             const urlParams = new URLSearchParams(window.location.search);
//             const categoryId = urlParams.get('category');

//             if (categoryId) {
//                 const menuItems = document.querySelectorAll('.menu-item');

//                 menuItems.forEach(item => {
//                     if (item.dataset.category === categoryId) {
//                         item.classList.add('active');
//                         const subcategory = item.querySelector('.subcategory');
//                         if (subcategory) {
//                             subcategory.classList.add('show');
//                         }
//                     }
//                 });
//                 this.selectedCategory = categoryId;
//             }
//         },
//         generateBreadcrumb() {
//             const urlParams = new URLSearchParams(window.location.search);
//             const categoryId = urlParams.get('category');
//             const searchQuery = urlParams.get('search');

//             const breadcrumbContainer = document.querySelector('.breadcrumb');
//             breadcrumbContainer.innerHTML = `<li class="breadcrumb-item"><a href="index.html">首頁</a></li>`;

//             if (searchQuery) {
//                 breadcrumbContainer.innerHTML += `<li class="breadcrumb-item active" aria-current="page">搜尋結果: ${searchQuery}</li>`;
//             } else if (categoryId) {
//                 const selectedCategory = this.categories.find(cat => cat.id === categoryId);
//                 if (selectedCategory) {
//                     if (selectedCategory.parent) {
//                         const parentCategory = this.categories.find(cat => cat.id === selectedCategory.parent);
//                         if (parentCategory) {
//                             breadcrumbContainer.innerHTML += `<li class="breadcrumb-item"><a href="product.html?category=${parentCategory.id}">${parentCategory.name}</a></li>`;
//                         }
//                     }
//                     breadcrumbContainer.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${selectedCategory.name}</li>`;
//                 }
//             }
//         },
//         updateUrlAndBreadcrumb(categoryId) {
//             const url = new URL(window.location.href);
//             url.searchParams.set('category', categoryId);
//             url.searchParams.delete('search'); // 清除搜索参数
//             window.history.pushState({}, '', url);

//             this.generateBreadcrumb();
//         }
//     }
// });

new Vue({
    el: '#app',
    data: {
        products: [], // 商品数据
        selectedCategory: '', // 选中的类别
        categories: [], // 存储类别数据
        searchQuery: '', // 搜索查询
        filteredProducts: [] // 过滤后的商品数据
    },
    computed: {
        filteredProducts() {
            if (!this.products.length) return [];

            // 过滤类别
            let filteredByCategory = this.selectedCategory
                ? this.products.filter(product =>
                    product.category.split(',').includes(this.selectedCategory)
                )
                : this.products;

            // 过滤搜索查询
            return filteredByCategory.filter(product =>
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    mounted() {
        this.loadCategories();
        this.loadProducts();
        this.bindSearchEvents();
        this.loadUrlParams(); // 处理 URL 查询参数
    },
    methods: {
        loadCategories() {
            fetch('categories.json')
                .then(response => response.json())
                .then(data => {
                    this.categories = data.categories;
                    this.generateMenu(data.categories);
                    this.setActiveMenu();
                    this.generateBreadcrumb();
                })
                .catch(error => console.error('Error loading categories JSON:', error));
        },
        loadProducts() {
            fetch('products.json')
                .then(response => response.json())
                .then(data => {
                    this.products = data;
                    this.filterProducts();
                })
                .catch(error => console.error('Error loading products JSON:', error));
        },
        bindSearchEvents() {
            const input = document.getElementById('input');
            const searchButton = document.querySelector('.search-btn');

            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    this.performSearch();
                }
            });

            searchButton.addEventListener('click', () => {
                this.performSearch();
            });
        },
        performSearch() {
            this.searchQuery = document.getElementById('input').value;
            this.filterProducts(); // 过滤产品
            this.generateBreadcrumb(); // 更新面包屑导航
        },
        filterProducts() {
            this.$nextTick(() => {
                let filteredByCategory = this.selectedCategory
                    ? this.products.filter(product =>
                        product.category.split(',').includes(this.selectedCategory)
                    )
                    : this.products;

                this.filteredProducts = filteredByCategory.filter(product =>
                    product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
                );

                console.log('Filtered products:', this.filteredProducts); // 调试输出
            });
        },
        generateMenu(categories) {
            const menuContainer = document.getElementById('submenu');
            menuContainer.innerHTML = ''; // 清空现有菜单
            const menu = document.createElement('ul');
            menu.classList.add('category');
            const topLevelCategories = categories.filter(category => !category.parent);
            topLevelCategories.forEach(category => {
                const li = document.createElement('li');
                li.classList.add('menu-item');
                li.innerHTML = `${category.name} <i class="fa fa-chevron-down toggle-arrow"></i>`;
                li.dataset.category = category.id;

                const subcategoryUl = document.createElement('ul');
                subcategoryUl.classList.add('subcategory');

                const subcategories = categories.filter(cat => cat.parent === category.id);
                subcategories.forEach(subcategory => {
                    const subLi = document.createElement('li');
                    subLi.textContent = subcategory.name;
                    subLi.dataset.category = subcategory.id;
                    subcategoryUl.appendChild(subLi);
                });

                li.appendChild(subcategoryUl);
                menu.appendChild(li);
            });

            menuContainer.appendChild(menu);
            this.bindMenuEvents();
        },
        bindMenuEvents() {
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', (event) => {
                    event.stopPropagation();

                    menuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherSubcategory = otherItem.querySelector('.subcategory');
                            if (otherSubcategory) {
                                otherSubcategory.classList.remove('show');
                                otherSubcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
                            }
                            const otherArrowIcon = otherItem.querySelector('.toggle-arrow');
                            if (otherArrowIcon) {
                                otherArrowIcon.classList.remove('open');
                            }
                        }
                    });

                    item.classList.toggle('active');
                    const subcategory = item.querySelector('.subcategory');
                    const arrowIcon = item.querySelector('.toggle-arrow');
                    if (subcategory) {
                        subcategory.classList.toggle('show');
                        if (item.classList.contains('active')) {
                            subcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
                        }
                    }
                    if (arrowIcon) {
                        arrowIcon.classList.toggle('open');
                    }

                    this.selectedCategory = item.dataset.category;
                    this.filterProducts();
                    this.updateUrlAndBreadcrumb(item.dataset.category);
                });
            });

            document.querySelectorAll('.subcategory li').forEach(li => {
                li.addEventListener('click', (event) => {
                    event.stopPropagation();

                    li.parentElement.querySelectorAll('li').forEach(item => item.classList.remove('active'));

                    li.classList.add('active');

                    this.selectedCategory = li.dataset.category;
                    this.filterProducts();
                    this.updateUrlAndBreadcrumb(li.dataset.category);
                });
            });

            document.addEventListener('click', () => {
                const menuItems = document.querySelectorAll('.menu-item');
                menuItems.forEach(item => {
                    const subcategory = item.querySelector('.subcategory');
                    if (subcategory) {
                        subcategory.classList.remove('show');
                    }
                    item.classList.remove('active');
                    const arrowIcon = item.querySelector('.toggle-arrow');
                    if (arrowIcon) {
                        arrowIcon.classList.remove('open');
                    }
                });
            });
        },
        setActiveMenu() {
            const urlParams = new URLSearchParams(window.location.search);
            const categoryId = urlParams.get('category');

            if (categoryId) {
                const menuItems = document.querySelectorAll('.menu-item');

                menuItems.forEach(item => {
                    if (item.dataset.category === categoryId) {
                        item.classList.add('active');
                        const subcategory = item.querySelector('.subcategory');
                        if (subcategory) {
                            subcategory.classList.add('show');
                        }
                    }
                });
                this.selectedCategory = categoryId;
            }
        },
        generateBreadcrumb() {
            const urlParams = new URLSearchParams(window.location.search);
            const categoryId = urlParams.get('category');
            const searchQuery = urlParams.get('search');

            const breadcrumbContainer = document.querySelector('.breadcrumb');
            breadcrumbContainer.innerHTML = `<li class="breadcrumb-item"><a href="index.html">首頁</a></li>`;

            if (searchQuery) {
                breadcrumbContainer.innerHTML += `<li class="breadcrumb-item active" aria-current="page">搜尋結果: ${searchQuery}</li>`;
            } else if (categoryId) {
                const selectedCategory = this.categories.find(cat => cat.id === categoryId);
                if (selectedCategory) {
                    if (selectedCategory.parent) {
                        const parentCategory = this.categories.find(cat => cat.id === selectedCategory.parent);
                        if (parentCategory) {
                            breadcrumbContainer.innerHTML += `<li class="breadcrumb-item"><a href="product.html?category=${parentCategory.id}">${parentCategory.name}</a></li>`;
                        }
                    }
                    breadcrumbContainer.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${selectedCategory.name}</li>`;
                }
            }
        },
        updateUrlAndBreadcrumb(categoryId) {
            const url = new URL(window.location.href);
            url.searchParams.set('category', categoryId);
            url.searchParams.delete('search'); // 清除搜索参数
            window.history.pushState({}, '', url);

            this.generateBreadcrumb();
        },
        loadUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('search');
            const categoryId = urlParams.get('category');

            // 设置搜索查询
            if (query) {
                this.searchQuery = query;
            }

            // 设置选中的类别
            if (categoryId) {
                this.selectedCategory = categoryId;
            }

            // 过滤产品
            this.filterProducts();

            // 生成面包屑导航
            this.generateBreadcrumb();
        }
    }
});

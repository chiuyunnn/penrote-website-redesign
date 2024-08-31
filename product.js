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

    new Vue({
        el: '#app',
        data: {
            products: [], // 所有产品数据
            selectedCategory: '', // 当前选中的类别
            categories: [], // 所有类别数据
            searchQuery: '', // 搜索查询字符串
            currentPage: 1, // 当前页码
            perPage: 9, // 每页显示的产品数量
            filteredProducts: [] // 过滤后的产品数据
        },
        computed: {
            // 根据当前页码计算要显示的产品
            paginatedProducts() {
                const start = (this.currentPage - 1) * this.perPage;
                const end = start + this.perPage;
                return this.filteredProducts.slice(start, end);
            },
            // 计算总页数
            totalPages() {
                return Math.ceil(this.filteredProducts.length / this.perPage);
            },
            // 生成页码按钮
            pageNumbers() {
                let pages = [];
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
                return pages;
            }
        },
        mounted() {
            this.loadCategories(); // 加载类别数据
            this.loadProducts(); // 加载产品数据
            this.bindSearchEvents(); // 绑定搜索框和按钮的事件
            this.loadUrlParams(); // 加载 URL 查询参数
        },
        methods: {
            // 加载类别数据并生成菜单
            loadCategories() {
                fetch('categories.json')
                    .then(response => response.json())
                    .then(data => {
                        this.categories = data.categories;
                        this.generateMenu(data.categories);
                        this.setActiveMenu(); // 设置菜单的活跃状态
                        this.generateBreadcrumb();
                    })
                    .catch(error => console.error('Error loading categories JSON:', error));
            },
    
            // 加载产品数据并过滤产品
            loadProducts() {
                fetch('products.json')
                    .then(response => response.json())
                    .then(data => {
                        this.products = data;
                        this.filterProducts(); // 初始过滤
                    })
                    .catch(error => console.error('Error loading products JSON:', error));
            },
    
            // 绑定搜索框和搜索按钮的事件
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
    
            // 执行搜索操作
            performSearch() {
                this.searchQuery = document.getElementById('input').value;
                this.filterProducts(); // 重新过滤
                this.generateBreadcrumb();
                this.currentPage = 1; // 在搜索后重置为第一页
            },
    
            // 根据选中的类别和搜索查询过滤产品
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
    
                    this.currentPage = 1; // 重置为第一页
                });
            },
    
            // 生成侧边菜单
            generateMenu(categories) {
                const menuContainer = document.getElementById('submenu');
                menuContainer.innerHTML = '';
    
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
                this.bindMenuEvents(); // 绑定菜单项事件
            },
    
            // 绑定菜单项的事件
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
                        if (subcategory) {
                            subcategory.classList.toggle('show');
                            subcategory.querySelectorAll('li').forEach(subItem => {
                                subItem.classList.toggle('active', subItem.dataset.category === this.selectedCategory);
                            });
                        }
    
                        const arrowIcon = item.querySelector('.toggle-arrow');
                        if (arrowIcon) {
                            arrowIcon.classList.toggle('open');
                        }
    
                        this.selectedCategory = item.dataset.category;
                        this.filterProducts();
                        this.updateUrlAndBreadcrumb(item.dataset.category);
                    });
                });
    
                const subcategoryItems = document.querySelectorAll('.subcategory li');
                subcategoryItems.forEach(item => {
                    item.addEventListener('click', (event) => {
                        event.stopPropagation();
    
                        subcategoryItems.forEach(otherItem => otherItem.classList.remove('active'));
                        item.classList.add('active');
    
                        this.selectedCategory = item.dataset.category;
                        this.filterProducts();
                        this.updateUrlAndBreadcrumb(item.dataset.category);
                    });
                });
            },
    
            // 根据选中的类别更新 URL 和面包屑
            updateUrlAndBreadcrumb(categoryId) {
                const url = new URL(window.location.href);
                url.searchParams.set('category', categoryId);
                window.history.pushState({}, '', url);
                this.generateBreadcrumb();
            },
    
            // 根据 URL 查询参数加载产品类别
            loadUrlParams() {
                const urlParams = new URLSearchParams(window.location.search);
                const categoryId = urlParams.get('category');
                const searchQuery = urlParams.get('search'); // 获取搜索查询参数
    
                if (categoryId) {
                    this.selectedCategory = categoryId;
                }
    
                if (searchQuery) {
                    this.searchQuery = searchQuery; // 设置搜索查询
                }
    
                this.filterProducts(); // 过滤产品
                this.setActiveMenu(); // 设置菜单的活跃状态
            },
    
            // 生成面包屑
            generateBreadcrumb() {
                const breadcrumb = document.querySelector('.breadcrumb');
                breadcrumb.innerHTML = '<li class="breadcrumb-item"><a href="index.html">首頁</a></li>';
    
                if (this.selectedCategory) {
                    let category = this.categories.find(cat => cat.id === this.selectedCategory);
                    const path = [];
                    while (category) {
                        path.unshift(category);
                        category = this.categories.find(cat => cat.id === category.parent);
                    }
                    path.forEach((cat, index) => {
                        if (index === path.length - 1) {
                            breadcrumb.innerHTML += `<li class="breadcrumb-item active">${cat.name}</li>`;
                        } else {
                            breadcrumb.innerHTML += `<li class="breadcrumb-item"><a href="?category=${cat.id}">${cat.name}</a></li>`;
                        }
                    });
                }
            },
    
            // 分页跳转
            goToPage(page) {
                if (page < 1 || page > this.totalPages) return;
                this.currentPage = page;
                window.scrollTo(0, 0); // 分页时滚动到顶部
            },
    
            // 设置菜单的活跃状态
            setActiveMenu() {
                const menuItems = document.querySelectorAll('.menu-item');
                menuItems.forEach(item => {
                    const subcategoryItems = item.querySelectorAll('.subcategory li');
                    if (this.selectedCategory && (
                        item.dataset.category === this.selectedCategory || 
                        Array.from(subcategoryItems).some(subItem => subItem.dataset.category === this.selectedCategory)
                    )) {
                        item.classList.add('active');
                        item.querySelector('.toggle-arrow').classList.add('open');
                        const subcategory = item.querySelector('.subcategory');
                        if (subcategory) {
                            subcategory.classList.add('show');
                        }
                    } else {
                        item.classList.remove('active');
                        item.querySelector('.toggle-arrow').classList.remove('open');
                        const subcategory = item.querySelector('.subcategory');
                        if (subcategory) {
                            subcategory.classList.remove('show');
                        }
                    }
                });
            }
        }
    });
    
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
    handleScroll();
});

new Vue({
    el: '#app',
    data: {
        products: [],
        selectedCategory: '',
        categories: [],
        searchQuery: '',
        currentPage: 1,
        perPage: 9,
        filteredProducts: [],
        parentCategories: [],
        childCategories: []
    },
    computed: {
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.filteredProducts.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.perPage);
        },
        pageNumbers() {
            let pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    mounted() {
        this.loadCategories();
        this.loadProducts();
        this.bindSearchEvents();
        this.loadUrlParams();
    },
    methods: {
        loadCategories() {
            fetch('../categories.json')
                .then(response => response.json())
                .then(data => {
                    this.categories = data.categories;
                    this.generateMenu(data.categories);
                    this.populateDropdownMenus(data.categories);
                    this.setActiveMenu();
                    this.generateBreadcrumb();
                })
                .catch(error => console.error('Error loading categories JSON:', error));
        },

        loadProducts() {
            fetch('../products.json')
                .then(response => response.json())
                .then(data => {
                    this.products = data;
                    this.filterProducts();
                })
                .catch(error => console.error('Error loading products JSON:', error));
        },

        bindSearchEvents() {
            const input = document.getElementById('input');
            const menuInput = document.getElementById('menu-input');
            const searchButton = document.querySelector('.search-btn');

            if (input) {
                input.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        this.performSearch();
                    }
                });
            }

            if (menuInput) {
                menuInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        this.performSearch();
                    }
                });
            }

            if (searchButton) {
                searchButton.addEventListener('click', () => {
                    this.performSearch();
                });
            }
        },

        performSearch() {
            const input = document.getElementById('input');
            const menuInput = document.getElementById('menu-input');

            this.searchQuery = (input && input.value.trim()) || (menuInput && menuInput.value.trim());

            this.selectedCategory = '';

            document.getElementById('parent-dropdown').value = '';
            document.getElementById('child-dropdown').innerHTML = '<option value="">選擇類別</option>';

            if (this.searchQuery) {
                this.filterProducts();
                this.generateBreadcrumb();
                this.currentPage = 1;

                const url = new URL(window.location.href);
                url.searchParams.set('search', this.searchQuery);
                url.searchParams.delete('category');
                window.history.pushState({}, '', url);
            }
        },

        filterProducts() {
            this.$nextTick(() => {
                let filteredByCategory = this.selectedCategory
                    ? this.products.filter(product =>
                        product.category.split(',').includes(this.selectedCategory)
                    )
                    : this.products;

                const selectedParentCategory = document.getElementById('parent-dropdown').value;
                if (selectedParentCategory) {
                    filteredByCategory = filteredByCategory.filter(product =>
                        product.category.split(',').includes(selectedParentCategory)
                    );
                }

                this.filteredProducts = filteredByCategory.filter(product =>
                    product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
                );

                this.currentPage = 1;
            });
        },

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
            this.bindMenuEvents();
        },

        populateDropdownMenus(categories) {
            const parentDropdown = document.getElementById('parent-dropdown');
            const childDropdown = document.getElementById('child-dropdown');

            const topLevelCategories = categories.filter(category => !category.parent);
            topLevelCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                parentDropdown.appendChild(option);
            });

            childDropdown.innerHTML = '<option value="">選擇類別</option>';

            parentDropdown.addEventListener('change', (event) => {
                const selectedParentId = event.target.value;
                const subcategories = categories.filter(cat => cat.parent === selectedParentId);
                
                childDropdown.innerHTML = '<option value="">選擇類別</option>';

                subcategories.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.id;
                    option.textContent = subcategory.name;
                    childDropdown.appendChild(option);
                });

                this.selectedCategory = '';
                this.filterProducts();
                this.generateBreadcrumb();
            });

            childDropdown.addEventListener('change', (event) => {
                this.selectedCategory = event.target.value;
                this.filterProducts();
                this.generateBreadcrumb();
            });

            this.updateChildDropdown();
        },

        updateChildDropdown() {
            const parentDropdown = document.getElementById('parent-dropdown');
            const childDropdown = document.getElementById('child-dropdown');

            const selectedParentId = parentDropdown.value;
            if (selectedParentId) {
                const subcategories = this.categories.filter(cat => cat.parent === selectedParentId);
                
                childDropdown.innerHTML = '<option value="">選擇類別</option>';

                subcategories.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.id;
                    option.textContent = subcategory.name;
                    childDropdown.appendChild(option);
                });

                if (this.selectedCategory) {
                    childDropdown.value = this.selectedCategory;
                }
            }
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
                    this.searchQuery = '';
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
                    this.searchQuery = '';
                    this.filterProducts();
                    this.updateUrlAndBreadcrumb(item.dataset.category);
                });
            });
        },

        updateUrlAndBreadcrumb(categoryId) {
            const url = new URL(window.location.href);
            url.searchParams.set('category', categoryId);
            url.searchParams.delete('search');
            window.history.pushState({}, '', url);
            this.generateBreadcrumb();
        },

        loadUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            const categoryId = urlParams.get('category');
            const searchQuery = urlParams.get('search');

            if (categoryId) {
                this.selectedCategory = categoryId;
            }

            if (searchQuery) {
                this.searchQuery = searchQuery;
            }

            this.filterProducts();
            this.setActiveMenu();
        },

        generateBreadcrumb() {
            const breadcrumb = document.querySelector('.breadcrumb');
            breadcrumb.innerHTML = '<li class="breadcrumb-item"><a href="../index/index.html">首頁</a></li>';

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

        goToPage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            window.scrollTo(0, 0);
        },

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

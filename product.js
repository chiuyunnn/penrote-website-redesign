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
//         searchQuery: '' // 搜索查询
//     },
//     computed: {
//         filteredProducts() {
//             // 过滤类别
//             let filteredByCategory = this.selectedCategory
//                 ? this.products.filter(product => 
//                     product.category.split(',').includes(this.selectedCategory)
//                 )
//                 : this.products;

//             // 过滤搜索
//             return filteredByCategory.filter(product => 
//                 product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//                 product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
//             );
//         }
//     },
//     mounted() {
//         // 加载类别数据
//         fetch('categories.json')
//             .then(response => response.json())
//             .then(data => {
//                 this.categories = data.categories;
//                 this.generateMenu(data.categories);
//                 this.bindMenuEvents();
//             })
//             .catch(error => console.error('Error loading categories JSON:', error));

//         // 加载商品数据
//         fetch('products.json')
//             .then(response => response.json())
//             .then(data => {
//                 this.products = data;
//             })
//             .catch(error => console.error('Error loading products JSON:', error));

//         // 搜索功能
//         document.getElementById('input').addEventListener('input', (event) => {
//             this.searchQuery = event.target.value;
//         });

//         document.querySelector('.search-btn').addEventListener('click', () => {
//             this.searchQuery = document.getElementById('input').value;
//         });

//         document.getElementById('input').addEventListener('keypress', (event) => {
//             if (event.key === 'Enter') {
//                 this.searchQuery = event.target.value;
//             }
//         });
//     },
//     methods: {
//         generateMenu(categories) {
//             const menuContainer = document.getElementById('submenu');
//             const menu = document.createElement('ul');
//             menu.classList.add('category');

//             // 生成一级菜单
//             const topLevelCategories = categories.filter(category => !category.parent);
//             topLevelCategories.forEach(category => {
//                 const li = document.createElement('li');
//                 li.classList.add('menu-item');
//                 li.innerHTML = `${category.name} <i class="fa fa-chevron-down toggle-arrow"></i>`;
//                 li.dataset.category = category.id; // 存储类别 ID

//                 // 创建子菜单容器
//                 const subcategoryUl = document.createElement('ul');
//                 subcategoryUl.classList.add('subcategory');

//                 // 生成二级菜单
//                 const subcategories = categories.filter(cat => cat.parent === category.id);
//                 subcategories.forEach(subcategory => {
//                     const subLi = document.createElement('li');
//                     subLi.textContent = subcategory.name;
//                     subLi.dataset.category = subcategory.id; // 存储类别 ID
//                     subcategoryUl.appendChild(subLi);
//                 });

//                 li.appendChild(subcategoryUl);
//                 menu.appendChild(li);
//             });

//             menuContainer.appendChild(menu);
//         },
//         bindMenuEvents() {
//             const menuItems = document.querySelectorAll('.menu-item');

//             menuItems.forEach(item => {
//                 item.addEventListener('click', (event) => {
//                     event.stopPropagation();

//                     // 清除所有菜单项的 active 状态
//                     menuItems.forEach(otherItem => {
//                         if (otherItem !== item) {
//                             otherItem.classList.remove('active');
//                             const otherSubcategory = otherItem.querySelector('.subcategory');
//                             if (otherSubcategory) {
//                                 otherSubcategory.classList.remove('show');
//                                 // 清除所有子菜单项的 active 状态
//                                 otherSubcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
//                             }
//                             const otherArrowIcon = otherItem.querySelector('.toggle-arrow');
//                             if (otherArrowIcon) {
//                                 otherArrowIcon.classList.remove('open');
//                             }
//                         }
//                     });

//                     // 更新当前点击的菜单项状态
//                     item.classList.toggle('active');
//                     const subcategory = item.querySelector('.subcategory');
//                     const arrowIcon = item.querySelector('.toggle-arrow');
//                     if (subcategory) {
//                         subcategory.classList.toggle('show');
//                         // 确保在展开子菜单时清除之前的子菜单项的 active 状态
//                         if (item.classList.contains('active')) {
//                             subcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
//                         }
//                     }
//                     if (arrowIcon) {
//                         arrowIcon.classList.toggle('open');
//                     }

//                     // 更新选中的类别
//                     this.selectedCategory = item.dataset.category;
//                 });
//             });

//             document.querySelectorAll('.subcategory li').forEach(li => {
//                 li.addEventListener('click', (event) => {
//                     event.stopPropagation();

//                     // 清除当前父菜单下的所有子菜单项的 active 状态
//                     li.parentElement.querySelectorAll('li').forEach(item => item.classList.remove('active'));

//                     // 设置当前点击的子菜单项为 active
//                     li.classList.add('active');

//                     // 更新选中的类别
//                     this.selectedCategory = li.dataset.category;
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
//         }
//     }
// });

new Vue({
    el: '#app',
    data: {
        products: [], // 商品数据
        selectedCategory: '', // 选中的类别
        categories: [], // 存储类别数据
        searchQuery: '' // 搜索查询
    },
    computed: {
        filteredProducts() {
            // 过滤类别
            let filteredByCategory = this.selectedCategory
                ? this.products.filter(product => 
                    product.category.split(',').includes(this.selectedCategory)
                )
                : this.products;

            // 过滤搜索
            return filteredByCategory.filter(product => 
                product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.model.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    mounted() {
        // 加载类别数据
        fetch('categories.json')
            .then(response => response.json())
            .then(data => {
                this.categories = data.categories;
                this.generateMenu(data.categories);
                this.bindMenuEvents();
            })
            .catch(error => console.error('Error loading categories JSON:', error));

        // 加载商品数据
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                this.products = data;
            })
            .catch(error => console.error('Error loading products JSON:', error));

        // 监听输入框和按钮事件
        this.$refs.input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // 防止表单提交或其他默认行为
                this.performSearch(); // 执行搜索
            }
        });
    },
    methods: {
        performSearch() {
            if (this.searchQuery.trim()) {
                // 使用 encodeURIComponent 对搜索查询进行编码
                const query = encodeURIComponent(this.searchQuery.trim());
                // 调试输出，确保 URL 生成正确
                console.log(`Searching for: ${query}`);
                window.location.href = `product.html?search=${query}`;
            }
        },
        generateMenu(categories) {
            const menuContainer = document.getElementById('submenu');
            const menu = document.createElement('ul');
            menu.classList.add('category');

            // 生成一级菜单
            const topLevelCategories = categories.filter(category => !category.parent);
            topLevelCategories.forEach(category => {
                const li = document.createElement('li');
                li.classList.add('menu-item');
                li.innerHTML = `${category.name} <i class="fa fa-chevron-down toggle-arrow"></i>`;
                li.dataset.category = category.id; // 存储类别 ID

                // 创建子菜单容器
                const subcategoryUl = document.createElement('ul');
                subcategoryUl.classList.add('subcategory');

                // 生成二级菜单
                const subcategories = categories.filter(cat => cat.parent === category.id);
                subcategories.forEach(subcategory => {
                    const subLi = document.createElement('li');
                    subLi.textContent = subcategory.name;
                    subLi.dataset.category = subcategory.id; // 存储类别 ID
                    subcategoryUl.appendChild(subLi);
                });

                li.appendChild(subcategoryUl);
                menu.appendChild(li);
            });

            menuContainer.appendChild(menu);
        },
        bindMenuEvents() {
            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => {
                item.addEventListener('click', (event) => {
                    event.stopPropagation();

                    // 清除所有菜单项的 active 状态
                    menuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherSubcategory = otherItem.querySelector('.subcategory');
                            if (otherSubcategory) {
                                otherSubcategory.classList.remove('show');
                                // 清除所有子菜单项的 active 状态
                                otherSubcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
                            }
                            const otherArrowIcon = otherItem.querySelector('.toggle-arrow');
                            if (otherArrowIcon) {
                                otherArrowIcon.classList.remove('open');
                            }
                        }
                    });

                    // 更新当前点击的菜单项状态
                    item.classList.toggle('active');
                    const subcategory = item.querySelector('.subcategory');
                    const arrowIcon = item.querySelector('.toggle-arrow');
                    if (subcategory) {
                        subcategory.classList.toggle('show');
                        // 确保在展开子菜单时清除之前的子菜单项的 active 状态
                        if (item.classList.contains('active')) {
                            subcategory.querySelectorAll('li').forEach(subItem => subItem.classList.remove('active'));
                        }
                    }
                    if (arrowIcon) {
                        arrowIcon.classList.toggle('open');
                    }

                    // 更新选中的类别
                    this.selectedCategory = item.dataset.category;
                });
            });

            document.querySelectorAll('.subcategory li').forEach(li => {
                li.addEventListener('click', (event) => {
                    event.stopPropagation();

                    // 清除当前父菜单下的所有子菜单项的 active 状态
                    li.parentElement.querySelectorAll('li').forEach(item => item.classList.remove('active'));

                    // 设置当前点击的子菜单项为 active
                    li.classList.add('active');

                    // 更新选中的类别
                    this.selectedCategory = li.dataset.category;
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
        }
    }
});

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
    handleScroll();
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
        modalArticles.innerHTML = '';

        article.content.forEach(item => {
            if (item.type === 'text') {
                const div = document.createElement('div');
                div.innerHTML = item.content;
                modalArticles.appendChild(div);
            } else if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = "../" + item.pic;
                img.classList.add('modal-content-image');
                modalArticles.appendChild(img);
            }
        });

        modalThumbnails.innerHTML = '';

        article.thumbnails.forEach(pic => {
            const img = document.createElement('img');
            img.src = "../" + pic;
            img.classList.add('modal-thumbnail');
            modalThumbnails.appendChild(img);
        });

        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    fetch('../articles.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(article => {
                const articleItem = document.createElement('div');
                articleItem.classList.add('article-item');
                articleItem.dataset.id = article.id;
                articleItem.innerHTML = `
                    <img src="../${article.thumbnails[0]}" class="article-thumbnail" alt="Thumbnail">
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
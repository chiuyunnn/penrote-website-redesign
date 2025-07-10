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
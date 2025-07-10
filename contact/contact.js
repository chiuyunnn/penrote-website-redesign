document.addEventListener('DOMContentLoaded', function () {
            const contact = document.querySelector('.contact');

            function handleScroll() {
                const contactRect = contact.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                if (contactRect.top < viewportHeight && contactRect.bottom > 0) {
                    contact.classList.add('visible');
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
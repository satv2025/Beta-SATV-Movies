const toggleButton = document.querySelector('.dropdown-toggle');

document
    .querySelector('[data-season="all-episodes"]')
    .addEventListener('click', () => {
        toggleButton.classList.add('all-episodes-style');
    });
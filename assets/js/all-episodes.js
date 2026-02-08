const toggleButton = document.querySelector('.dropdown-toggle');

document
    .querySelector('[data-season="all-episodes"]')
    .addEventListener('click', () => {
        toggleButton.classList.add('all-episodes-style');
    });

// Cuando se haga click en cualquier otro elemento (que no sea el que tiene el atributo "data-season" con valor "all-episodes")
document.querySelectorAll('[data-season]').forEach(item => {
    item.addEventListener('click', (event) => {
        if (!event.target.hasAttribute('data-season') || event.target.getAttribute('data-season') !== 'all-episodes') {
            toggleButton.classList.remove('all-episodes-style');
        }
    });
});
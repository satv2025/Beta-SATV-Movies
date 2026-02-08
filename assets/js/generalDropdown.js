document.addEventListener('DOMContentLoaded', () => {

    const dropdown = document.querySelector('.season-dropdown');
    const toggle = document.querySelector('.dropdown-toggle');
    const menu = document.querySelector('.dropdown-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const open = menu.style.display === 'block';
        menu.style.display = open ? 'none' : 'block';
        dropdown.classList.toggle('open', !open);
    });

});
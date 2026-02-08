document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.dropdown-toggle');
    const menu = document.querySelector('.dropdown-menu');
    const seasons = document.querySelectorAll('.season');  // Todas las temporadas

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
        toggle.classList.toggle('open', !isOpen);
    });

    // Cambio de temporada
    menu.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') {
            const seasonToShow = e.target.dataset.season; // Temporada seleccionada
            // Mostrar u ocultar temporadas según la elección
            seasons.forEach(season => {
                if (season.dataset.season === seasonToShow) {
                    season.style.display = 'block'; // Mostrar la temporada seleccionada
                } else {
                    season.style.display = 'none'; // Ocultar las otras
                }
            });

            // Cambiar el texto del botón para reflejar la temporada seleccionada
            toggle.textContent = `Temporada ${seasonToShow}`;

            // Cerrar el menú
            menu.style.display = 'none';
            toggle.classList.remove('open');
        }
    });
});
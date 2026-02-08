document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.dropdown-toggle');
    const menu = document.querySelector('.dropdown-menu');
    const seasons = document.querySelectorAll('.season');  // Todas las temporadas

    if (!toggleButton || !menu || !seasons.length) {
        console.error('No se encontraron los elementos necesarios en el DOM');
        return;
    }

    // Abre o cierra el menú y gira la flecha
    toggleButton.addEventListener('click', () => {
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
        toggleButton.classList.toggle('open', !isOpen); // Añadir o quitar clase 'open' para el menú

        // Gira la flecha dependiendo de si el menú está abierto
        if (isOpen) {
            toggleButton.querySelector('::after').style.transform = 'rotate(0deg)'; // Flecha hacia abajo
        } else {
            toggleButton.querySelector('::after').style.transform = 'rotate(180deg)'; // Flecha hacia arriba
        }
    });

    // Cuando se selecciona "Ver todos los episodios"
    document
        .querySelector('[data-season="all-episodes"]')
        .addEventListener('click', () => {
            toggleButton.classList.add('all-episodes-style');
            toggleButton.textContent = 'Ver todos los episodios';  // Cambiar el texto del botón
            // Mostrar todos los episodios
            seasons.forEach(season => {
                season.style.display = 'block';  // Mostrar todas las temporadas
            });
            // Cerrar el menú
            menu.style.display = 'none';
            toggleButton.classList.remove('open');
        });

    // Cambio de temporada
    menu.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') {
            const seasonToShow = e.target.dataset.season; // Temporada seleccionada
            // Mostrar u ocultar temporadas según la elección
            seasons.forEach(season => {
                // Si es la temporada seleccionada, mostrarla; de lo contrario, ocultarla
                if (season.dataset.season === seasonToShow) {
                    season.style.display = 'grid';  // Mostrar la temporada seleccionada en formato de grid
                } else {
                    season.style.display = 'none';  // Ocultar la temporada no seleccionada
                }
            });

            // Cambiar el texto del botón para reflejar la temporada seleccionada
            if (seasonToShow === 'all-episodes') {
                toggleButton.textContent = 'Ver todos los episodios';  // Texto para "all episodes"
            } else {
                toggleButton.textContent = `Temporada ${seasonToShow}`;  // Texto para las temporadas normales
            }

            // Cerrar el menú y restablecer la flecha
            menu.style.display = 'none';
            toggleButton.classList.remove('open');
            toggleButton.querySelector('::after').style.transform = 'rotate(0deg)'; // Flecha hacia abajo
        }
    });

    // Cuando se haga clic en cualquier otro botón de temporada, eliminar la clase 'all-episodes-style'
    document.querySelectorAll('[data-season]')
        .forEach(item => {
            item.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-season') !== 'all-episodes') {
                    toggleButton.classList.remove('all-episodes-style');
                    // Cambiar el texto del botón de acuerdo con la temporada seleccionada
                    toggleButton.textContent = `Temporada ${event.target.getAttribute('data-season')}`;
                }
            });
        });
});
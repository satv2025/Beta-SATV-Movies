document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todas las tarjetas
    const cards = document.querySelectorAll('.card');

    // Elige una tarjeta aleatoria
    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    // Obtiene los datos de la tarjeta seleccionada
    const title = randomCard.querySelector('h3').textContent;
    const year = randomCard.querySelector('.film-type').textContent.split('·')[1].trim();
    const synopsis = randomCard.querySelector('.synopsis').textContent;
    const imageUrl = randomCard.querySelector('.card-img').getAttribute('src');

    // Actualiza el hero con los datos de la tarjeta seleccionada
    const heroBg = document.querySelector('.hero-bg');
    const heroTitle = document.querySelector('.hero-title');
    const heroYear = document.querySelector('.hero-film-type');
    const heroSynopsis = document.querySelector('.hero-synopsis');

    heroBg.setAttribute('src', imageUrl); // Cambia la imagen del fondo
    heroTitle.textContent = title; // Cambia el título
    heroYear.textContent = randomCard.querySelector('.film-type').textContent.trim(); // Cambia el año, ahora correcto
    heroSynopsis.textContent = synopsis; // Cambia la sinopsis
});
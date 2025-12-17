// Obtiene todas las cards
const cards = document.querySelectorAll(".card");

// Recorre cada card para agregarle el video y funcionalidad de hover
cards.forEach(card => {
    const media = card.querySelector(".media");

    // Se asigna el video de forma dinámica dentro de la card
    const video = document.createElement("video");
    video.setAttribute("muted", "true");
    video.setAttribute("loop", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("preload", "auto");

    // Enlace al video que se debe cargar dinámicamente (cambiar según el video)
    const videoSrc = card.dataset.videoSrc; // Asumiendo que cada card tiene el video fuente en data-video-src
    video.src = videoSrc;

    // Se inserta el video dentro de la sección .media
    media.appendChild(video);

    // Crear el botón de mute dinámicamente
    const muteButton = card.querySelector(".bmt-mute-btn"); // Usamos el botón que ya existe en el HTML

    // Funcionalidad de mute
    muteButton.addEventListener("click", () => {
        const muteIcon = muteButton.querySelector("img");
        if (video.muted) {
            video.muted = false;
            muteIcon.src = "https://movies.solargentinotv.com.ar/assets/media/images/modal-vol-on.svg"; // Icono de sonido activado
        } else {
            video.muted = true;
            muteIcon.src = "https://movies.solargentinotv.com.ar/assets/media/images/modal-vol-mute.svg"; // Icono de sonido desactivado
        }
    });

    // Hover para reproducir el video
    card.addEventListener("mouseenter", () => {
        video.play().catch(e => console.error("No se pudo reproducir el video:", e));

        // Crear la imagen de mute solo cuando el video esté en hover
        const muteIcon = document.createElement("img");
        muteIcon.id = "bmtMuteIcon";
        muteIcon.src = "https://movies.solargentinotv.com.ar/assets/media/images/modal-vol-mute.svg"; // Icono de mute
        muteIcon.alt = "Mute";

        // Inserta la imagen de mute dentro del botón
        muteButton.appendChild(muteIcon);

        // Mostrar el botón de mute
        muteButton.classList.add('mute-visible');
    });

    // Hover para pausar el video y ocultar el icono de mute
    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;

        // Eliminar el icono de mute cuando el video no esté en hover
        const muteIcon = muteButton.querySelector("img");
        if (muteIcon) muteIcon.remove(); // Eliminar el icono al salir del hover

        // Ocultar el botón de mute cuando el video no está en hover
        muteButton.classList.remove('mute-visible');
    });
});
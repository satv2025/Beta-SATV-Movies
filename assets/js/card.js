// Obtiene todas las cards
const cards = document.querySelectorAll(".card");

// Definir la URL del video para cada tarjeta
const videoUrls = {
    mpp: "https://dynavod.solargentinotv.com.ar/MATIAS_PONCE_-_LA_PEL%C3%8DCULA__TR%C3%81ILER_OFICIAL_2022.webm",
    cp1: "https://dynavod.solargentinotv.com.ar/100_LUCHA_LA_PEL%C3%8DCULA__Tr%C3%A1iler__HD_.mp4",
    cpeadc: "https://dynavod.solargentinotv.com.ar/100_LUCHA_EL_AMO_DE_LOS_CLONES__Tr%C3%A1iler__HD_.mp4",
    mpa: "https://dynavod.solargentinotv.com.ar/Mi_Pobre_Angelito_1_trailer.mp4",
    mpa2: "https://dynavod.solargentinotv.com.ar/Mi_Pobre_Angelito_2_trailer.mp4",
    app: "https://dynavod.solargentinotv.com.ar/Asesinato_para_principiantes__Tr%C3%A1iler_oficial__Netflix.mp4",
    nivelx: "https://dynavod.solargentinotv.com.ar/trailer_persons_T1E1-26_order.mp4",
    f2fnh: "https://dynavod.solargentinotv.com.ar/F2FNHTrailer.mp4"
};

// Recorre cada card para agregarle el video y funcionalidad de hover
cards.forEach(card => {
    const media = card.querySelector(".media");

    // Verifica si el contenedor .media existe
    if (!media) return;

    // Asume que cada card tiene un atributo 'id' que coincide con las claves del objeto 'videoUrls'
    const videoId = card.id; // Obtener el 'id' de la tarjeta, como 'mpp', 'cp1', etc.
    const videoSrc = videoUrls[videoId]; // Obtener la URL del video correspondiente

    if (!videoSrc) {
        console.error("No se encontró video source para esta card: " + videoId);
        return;
    }

    // Se asigna el video de forma dinámica dentro de la card
    const video = document.createElement("video");
    video.setAttribute("muted", "true");
    video.setAttribute("loop", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("preload", "auto");
    video.src = videoSrc;

    // Inserta el video dentro del contenedor .media
    media.appendChild(video);

    // Crear el botón de mute dinámicamente si no existe
    let muteButton = card.querySelector(".bmt-mute-btn");

    if (!muteButton) {
        muteButton = document.createElement("button");
        muteButton.classList.add("bmt-mute-btn");
        card.appendChild(muteButton);
    }

    // Crear el icono de mute que será controlado al hacer click
    const muteIcon = document.createElement("img");
    muteIcon.src = "https://movies.solargentinotv.com.ar/assets/media/images/modal-vol-mute.svg"; // Icono de sonido desactivado
    muteIcon.alt = "Mute";
    muteButton.appendChild(muteIcon);

    // Funcionalidad de mute
    muteButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el clic en el botón de mute dispare el evento click en la tarjeta

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
        // Reproducir video solo si no está siendo reproducido
        video.play().catch(e => console.error("No se pudo reproducir el video:", e));

        // Mostrar el botón de mute al pasar el ratón
        muteButton.classList.add('mute-visible');
    });

    // Hover para pausar el video y ocultar el icono de mute
    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;

        // Ocultar el botón de mute cuando el video no está en hover
        muteButton.classList.remove('mute-visible');
    });

    // Redirigir cuando se hace clic en la tarjeta (y no en el botón de mute)
    card.addEventListener("click", () => {
        // Redirigir a la URL especificada en el atributo de la tarjeta
        const redirectTo = card.getAttribute('onclick'); // Obtener el valor de 'onclick' de la tarjeta
        if (redirectTo) {
            window.location.href = redirectTo.replace("go(", "").replace(")", "");
        }
    });
});
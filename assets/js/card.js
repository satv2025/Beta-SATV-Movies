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
    reite: "https://dynavod.solargentinotv.com.ar/trailer.mp4",
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
    video.setAttribute("muted", "true");  // Iniciar en mute
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

    // Crear el icono de mute con SVG
    const muteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    muteIcon.setAttribute("viewBox", "0 0 24 24");
    muteIcon.setAttribute("width", "24");
    muteIcon.setAttribute("height", "24");
    muteIcon.setAttribute("aria-hidden", "true");
    muteIcon.setAttribute("fill", "none");
    muteIcon.setAttribute("role", "img");

    // Path de mute
    muteIcon.innerHTML = `<path fill="currentColor" fill-rule="evenodd" d="M24 12a14 14 0 0 0-4.1-9.9l-1.41 1.41a12 12 0 0 1 0 16.98l1.41 1.41A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zM16 12a6 6 0 0 0-1.76-4.24l-1.41 1.41a4 4 0 0 1 0 5.66l1.41 1.41A6 6 0 0 0 16 12m1.07-7.07a10 10 0 0 1 0 14.14l-1.41-1.41a8 8 0 0 0 0-11.32z" clip-rule="evenodd"></path>`;

    muteIcon.id = "bmtMuteIcon"; // Asignamos el ID
    muteButton.appendChild(muteIcon); // Añadimos el icono al botón de mute

    // Funcionalidad de mute
    muteButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el clic en el botón de mute dispare el evento click en la tarjeta

        if (video.muted) {
            video.muted = false;

            // Cambiar a icono de volumen activado
            muteIcon.innerHTML = `<path fill="currentColor" fill-rule="evenodd" d="M24 12a14 14 0 0 0-4.1-9.9l-1.41 1.41a12 12 0 0 1 0 16.98l1.41 1.41A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zM16 12a6 6 0 0 0-1.76-4.24l-1.41 1.41a4 4 0 0 1 0 5.66l1.41 1.41A6 6 0 0 0 16 12m1.07-7.07a10 10 0 0 1 0 14.14l-1.41-1.41a8 8 0 0 0 0-11.32z" clip-rule="evenodd"></path>`;
        } else {
            video.muted = true;

            // Cambiar a icono de mute
            muteIcon.innerHTML = `<path fill="currentColor" fill-rule="evenodd" d="M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20zM5.7 9.7 9 6.42V17.6l-3.3-3.3-.29-.29H2v-4h3.41zm9.6 0 2.29 2.3-2.3 2.3 1.42 1.4L19 13.42l2.3 2.3 1.4-1.42-2.28-2.3 2.3-2.3-1.42-1.4-2.3 2.28-2.3-2.3z" clip-rule="evenodd"></path>`;
        }
    });

    // Variable para verificar la primera interacción
    let hasInteracted = false;

    // Detectar la primera interacción con la página (mouse o tocando cualquier cosa)
    const interactHandler = () => {
        if (!hasInteracted) {
            hasInteracted = true;

            // Reproducir el video en mute cuando haya interacción
            video.play().catch(e => console.error("No se pudo reproducir el video:", e));

            // Remover el listener después de la primera interacción
            document.removeEventListener("mousemove", interactHandler);
            document.removeEventListener("click", interactHandler);
        }
    };

    document.addEventListener("click", interactHandler);     // Detecta cualquier clic

    // Hover para reproducir el video y ocultar la imagen
    card.addEventListener("mouseenter", () => {
        if (hasInteracted) {
            video.play().catch(e => console.error("No se pudo reproducir el video:", e));
        }

        // Ocultar la imagen (solo la imagen, no afecta al resto de la tarjeta)
        const img = card.querySelector('.card-img'); // Asegúrate de que la imagen tenga la clase 'card-img'
        if (img) {
            img.style.opacity = '0'; // Ocultar la imagen al hacer hover
        }

        // Mostrar el botón de mute al pasar el ratón
        muteButton.classList.add('mute-visible');
    });

    // Hover para pausar el video y mostrar la imagen nuevamente
    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;

        // Mostrar la imagen cuando se quita el hover
        const img = card.querySelector('.card-img');
        if (img) {
            img.style.opacity = '1'; // Mostrar la imagen nuevamente al quitar el hover
        }

        // Ocultar el botón de mute cuando el video no está en hover
        muteButton.classList.remove('mute-visible');
    });
});
// ================================
// CONFIGURACIÓN GENERAL
// ================================
const cards = document.querySelectorAll(".card");

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

let userInteracted = false;
let currentVideo = null;

// Detecta primera interacción del usuario
document.addEventListener("click", () => {
    userInteracted = true;
}, { once: true });

// ================================
// SETUP DE CADA CARD
// ================================
cards.forEach(card => {
    const media = card.querySelector(".media");
    if (!media) return;

    const videoSrc = videoUrls[card.id];
    if (!videoSrc) return;

    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";

    media.appendChild(video);

    // BOTÓN MUTE
    let muteBtn = card.querySelector(".bmt-mute-btn");
    if (!muteBtn) {
        muteBtn = document.createElement("button");
        muteBtn.className = "bmt-mute-btn";
        media.appendChild(muteBtn);
    }

    const updateIcon = () => {
        muteBtn.innerHTML = video.muted
            ? `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M11 4L6 9H2v6h4l5 5z"/></svg>`
            : `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M11 4L6 9H2v6h4l5 5zm5-1l-1.5 1.5a6 6 0 010 8L16 14a4 4 0 000-6z"/></svg>`;
    };

    updateIcon();

    muteBtn.addEventListener("click", e => {
        e.stopPropagation();
        video.muted = !video.muted;
        updateIcon();
    });

    // =========================
    // HOVER EVENTS
    // =========================
    card.addEventListener("mouseenter", () => {
        if (!userInteracted) return;

        if (currentVideo && currentVideo !== video) {
            currentVideo.pause();
            currentVideo.currentTime = 0;
        }

        currentVideo = video;
        video.play().catch(() => { });

        const img = card.querySelector(".card-img");
        if (img) img.style.opacity = "0";
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;

        const img = card.querySelector(".card-img");
        if (img) img.style.opacity = "1";
    });
});
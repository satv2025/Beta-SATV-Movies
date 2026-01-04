document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");
    if (!cards.length) return;

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

    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    const title = randomCard.querySelector("h3")?.textContent || "";
    const filmType = randomCard.querySelector(".film-type")?.textContent || "";
    const synopsis = randomCard.querySelector(".synopsis")?.textContent || "";
    const imageUrl = randomCard.querySelector(".card-img")?.src;
    const cardId = randomCard.id;
    const videoSrc = videoUrls[cardId];

    const hero = document.querySelector(".hero");
    const heroMedia = hero.querySelector(".hero-media");
    if (!hero || !heroMedia) return;

    document.querySelector(".hero-title").textContent = title;
    document.querySelector(".hero-film-type").textContent = filmType;
    document.querySelector(".hero-synopsis").textContent = synopsis;

    /* =========================
       IMAGEN INICIAL
    ========================= */

    let heroBg = document.createElement("img");
    heroBg.className = "hero-bg";
    heroBg.src = imageUrl;
    heroBg.alt = title;
    heroMedia.prepend(heroBg);

    /* =========================
       CONSENTIMIENTO
    ========================= */

    const acceptBtn = document.getElementById("btnAccept");
    if (!acceptBtn || !videoSrc) return;

    let userAccepted = false;

    acceptBtn.addEventListener("click", () => {
        userAccepted = true;
        startHeroVideo();
    }, { once: true });

    /* =========================
       VIDEO HERO
    ========================= */

    function startHeroVideo() {

        resetHero();

        const video = document.createElement("video");
        video.className = "hero-bg";
        video.src = videoSrc;
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("webkit-playsinline", "");
        video.autoplay = false;

        heroMedia.prepend(video);
        video.play().catch(() => { });

        const muteButton = document.createElement("button");
        muteButton.className = "bmt-mute-btn mute-visible";
        muteButton.setAttribute("aria-label", "Mute / Unmute");

        muteButton.innerHTML = `
      <svg id="bmtMuteIcon" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd"
          d="M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20z
             M5.7 9.7 9 6.42V17.6l-3.3-3.3H2v-4h3.7z
             m9.6 0 2.29 2.3-2.3 2.3 1.42 1.4L19 13.42l2.3 2.3
             1.4-1.42-2.28-2.3 2.3-2.3-1.42-1.4-2.3 2.28-2.3-2.3z"
          clip-rule="evenodd"></path>
      </svg>
    `;

        heroMedia.appendChild(muteButton);

        muteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
        });

        video.addEventListener("ended", resetHero);
    }

    /* =========================
       RESET HERO
    ========================= */

    function resetHero() {
        heroMedia.querySelector("video.hero-bg")?.remove();
        heroMedia.querySelector(".bmt-mute-btn")?.remove();

        if (!heroMedia.querySelector("img.hero-bg")) {
            heroBg = document.createElement("img");
            heroBg.className = "hero-bg";
            heroBg.src = imageUrl;
            heroBg.alt = title;
            heroMedia.prepend(heroBg);
        }
    }

    /* =========================
       INTERSECTION OBSERVER
    ========================= */

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!userAccepted) return;

            if (entry.isIntersecting) {
                if (!heroMedia.querySelector("video.hero-bg")) {
                    startHeroVideo();
                }
            } else {
                resetHero();
            }
        },
        { threshold: 0.3 }
    );

    observer.observe(hero);
});
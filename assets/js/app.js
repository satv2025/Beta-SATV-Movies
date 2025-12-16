function go(url) {
    window.location.href = url;
}

/* SEARCH */
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
    const v = searchInput.value.toLowerCase();
    cards.forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(v) ? "block" : "none";
    });
});

/* FILTERS */
document.querySelectorAll(".filters button").forEach(b => {
    b.onclick = () => {
        document.querySelectorAll(".filters button").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        const f = b.dataset.filter;
        cards.forEach(c => {
            c.style.display = f === "all" || c.dataset.type === f ? "block" : "none";
        });
    };
});

/* VIDEO PREVIEW + SOUND BUTTON (dynamic) */
document.querySelectorAll(".card").forEach(card => {
    const video = card.querySelector("video");
    const media = card.querySelector(".media");

    const MUTE = "https://movies.solargentinotv.com.ar/assets/media/images/modal-vol-mute.svg";
    const ON = "https://movies.solargentinotv.com.ar/assets/media/images/modal-vol-on.svg";

    let btn = null;
    let icon = null;

    card.addEventListener("mouseenter", () => {
        if (!video.src) video.src = video.dataset.src;

        video.muted = true;
        video.currentTime = 0;
        video.play().then(() => {
            // Crear botón solo si no existe
            if (!btn) {
                btn = document.createElement("div");
                btn.className = "sound-btn";

                icon = document.createElement("img");
                icon.src = MUTE;
                btn.appendChild(icon);

                media.appendChild(btn);

                // Toggle sonido
                btn.addEventListener("click", e => {
                    e.stopPropagation();
                    video.muted = !video.muted;
                    icon.src = video.muted ? MUTE : ON;
                });
            }

            // Mostrar botón
            btn.style.opacity = 1;
        }).catch(err => {
            console.warn("Error al reproducir video:", err);
        });
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.muted = true;

        if (icon) icon.src = MUTE;
        if (btn) btn.style.opacity = 0;
    });
});
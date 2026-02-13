(() => {

    /* =========================
       ELEMENTS
    ========================= */

    const modal = document.getElementById("mediaModal");
    const video = document.getElementById("nmVideo");

    const synopsis = document.getElementById("nmSynopsis");
    const curiosity = document.getElementById("nmSynoCuriosity")
    const castEl = document.getElementById("nmCast");
    const directorEl = document.getElementById("nmDirector");
    const writerEl = document.getElementById("nmWriter");

    const yearEl = document.getElementById("nmYear");
    const durationEl = document.getElementById("nmDuration");
    const ratingEl = document.getElementById("nmRating");

    const seasonToggle = document.getElementById("nmSeasonToggle");
    const seasonMenu = document.getElementById("nmSeasonMenu");
    const episodesWrap = document.getElementById("nmEpisodes");
    const seriesBlock = document.getElementById("nmSeriesBlock");

    const seriesHead = seriesBlock?.querySelector(".nm-series-head"); // ⭐ header "Episodios" + dropdown
    const seasonDropdown = document.querySelector(".season-dropdown");

    const closeBtn = modal.querySelector(".nm-close");

    let cardsData = null;
    let fullInfoData = null; // Nuevo
    let currentFullInfo = null;

    /* =========================
       VIDEO
    ========================= */

    function playVideo(src, poster) {
        if (video.dataset.src === src) return;

        video.pause();
        video.dataset.src = src;

        video.preload = "metadata";
        video.src = src;
        video.poster = poster || "";
        video.muted = true;

        requestAnimationFrame(() => {
            video.play().catch(() => { });
        });
    }

    /* =========================
       EPISODES
    ========================= */

    // Modificar la función para crear los episodios
    function createEpisodeRow(ep, i) {
        const row = document.createElement("button");
        row.className = "nm-episode";

        row.innerHTML = ` 
        <div class="nm-episode-number">${ep.number || i + 1}</div>
        <img class="nm-episode-thumb" src="${ep.thumb || ep.poster || ""}" loading="lazy">
        <div class="nm-episode-body">
            <div class="nm-episode-title">${ep.title || ""}</div>
            <div class="nm-episode-desc">${ep.description || ""}</div>
            <div class="nm-episode-duration">${ep.duration || ""}</div>
        </div>
    `;

        row.onclick = () => {
            if (currentFullInfo?.url) {

                const season = (ep.season ?? 0) + 1;   // fallback seguro
                const episode = ep.number || i + 1;

                window.location.href =
                    `${currentFullInfo.url}?titledata=t${season}e${episode}`;

            } else {
                playVideo(ep.src, ep.poster); // fallback por si es peli
            }
        };

        // Añadir bordes superior e inferior
        if (i === 0) row.style.borderTop = "1px solid #404040"; // borde superior solo en el primer episodio
        row.style.borderBottom = "1px solid #404040"; // borde inferior en todos los episodios

        // Añadir evento de hover para cambiar el borde superior
        row.addEventListener("mouseover", () => {
            if (i > 0) {  // Si no es el primer episodio
                const prevEpisode = episodesWrap.children[i - 1];
                prevEpisode.style.borderBottom = "none"; // Quitar el borde inferior del episodio anterior
                row.style.borderTop = "1px solid #404040"; // Añadir borde superior al episodio actual
            }
        });

        row.addEventListener("mouseout", () => {
            if (i > 0) {
                const prevEpisode = episodesWrap.children[i - 1];
                prevEpisode.style.borderBottom = "1px solid #404040"; // Restaurar el borde inferior del episodio anterior
                row.style.borderTop = "none"; // Quitar el borde superior al episodio actual
            }
        });

        return row;
    }

    ffunction renderEpisodes(season) {
        console.log("Renderizando episodios de la temporada:", season);
        const frag = document.createDocumentFragment();
        season?.episodes?.forEach((ep, i) => frag.appendChild(createEpisodeRow(ep, i)));
        episodesWrap.innerHTML = "";
        episodesWrap.appendChild(frag);

        // Encontramos el grid fuera del modal
        const originalGrid = document.querySelector(".grid");
        if (originalGrid) {
            // Clonamos el grid y lo insertamos dentro del modal
            const gridClone = originalGrid.cloneNode(true);
            gridClone.classList.add("nm-grid-clone"); // Añadimos una clase para identificarlo dentro del modal

            // Limpiamos el video y el mute para evitar que se reproduzcan en el modal
            gridClone.querySelectorAll("video, .bmt-mute-btn").forEach(el => el.remove());

            // Añadimos el overlay y la duración
            gridClone.querySelectorAll(".card").forEach(card => {

                const media = card.querySelector(".media");
                if (!media) return;

                /* ▶ play overlay */
                const overlay = document.createElement("div");
                overlay.className = "titleCard-playIcon";

                overlay.innerHTML = ` 
                <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
                    <path fill="currentColor" d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"/>
                </svg>
            `;

                media.appendChild(overlay);

                /* duración */
                const duration = card.querySelector(".film-type")?.textContent.match(/\d+\s*h.*|\d+\s*min/)?.[0];

                if (duration) {
                    const badge = document.createElement("span");
                    badge.className = "card-duration";
                    badge.textContent = duration;
                    media.appendChild(badge);
                }
            });

            // Lo insertamos debajo de los episodios dentro del modal
            episodesWrap.appendChild(gridClone);
            console.log("Grid copiado e insertado dentro del modal.");
        } else {
            console.log("No se encontró el grid fuera del modal.");
        }
    }

    function renderAllEpisodes(seasons = []) {
        console.log("Renderizando todos los episodios de todas las temporadas:", seasons);
        const frag = document.createDocumentFragment();
        seasons.forEach((season, sIndex) => {
            const header = document.createElement("div");
            header.className = "nm-season-header";
            header.textContent = `Temporada ${sIndex + 1}`;
            frag.appendChild(header);

            season.episodes?.forEach((ep, i) => frag.appendChild(createEpisodeRow(ep, i)));
        });

        episodesWrap.innerHTML = "";
        episodesWrap.appendChild(frag);

        // Agregar botón de "más" al final de los episodios
        const moreButton = document.createElement("a");
        moreButton.id = "scrollBtn";
        moreButton.className = "more-button";
        moreButton.textContent = "Ver todos los episodios";
        episodesWrap.appendChild(moreButton); // Asegúrate de añadirlo aquí

        // Encontramos el grid fuera del modal
        const originalGrid = document.querySelector(".grid");
        if (originalGrid) {
            // Clonamos el grid y lo insertamos dentro del modal
            const gridClone = originalGrid.cloneNode(true);
            gridClone.classList.add("nm-grid-clone"); // Añadimos una clase para identificarlo dentro del modal

            /* ===== LIMPIAR VIDEOS DEL CLONE ===== */
            gridClone.querySelectorAll("video, .bmt-mute-btn").forEach(el => el.remove());


            /* ===== ESTILO NETFLIX (overlay + duración) ===== */
            gridClone.querySelectorAll(".card").forEach(card => {

                const media = card.querySelector(".media");
                if (!media) return;

                /* ▶ play overlay */
                const overlay = document.createElement("div");
                overlay.className = "titleCard-playIcon";

                overlay.innerHTML = `
        <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
            <path fill="currentColor"
            d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"/>
        </svg>
    `;

                media.appendChild(overlay);

                /* duración */
                const duration =
                    card.querySelector(".film-type")
                        ?.textContent.match(/\d+\s*h.*|\d+\s*min/)?.[0];

                if (duration) {
                    const badge = document.createElement("span");
                    badge.className = "card-duration";
                    badge.textContent = duration;
                    media.appendChild(badge);
                }
            });

            // Lo insertamos debajo de los episodios dentro del modal
            episodesWrap.appendChild(gridClone);
            console.log("Grid copiado e insertado dentro del modal.");
        } else {
            console.log("No se encontró el grid fuera del modal.");
        }
    }

    /* =========================
       ⭐ GRID FALLBACK (PELÍCULAS)
    ========================= */

    function renderGridFallback() {
        console.log("Renderizando el fallback de grid para películas.");
        const originalGrid = document.querySelector(".grid");
        if (!originalGrid) return;

        const clone = originalGrid.cloneNode(true);
        clone.classList.add("nm-grid-fallback");

        // reactivar clicks en el clone
        clone.querySelectorAll(".card").forEach(card => {
            card.onclick = () => openModal(card.id);
        });

        episodesWrap.innerHTML = "";
        episodesWrap.appendChild(clone);
    }

    /* =========================
       SCROLL AUTOMÁTICO HASTA EL FINAL CON ANIMACIÓN
    ========================= */

    function scrollToBottom(element) {
        // Comprobamos si ya estamos en el fondo o cerca
        const scrollHeight = element.scrollHeight;
        const currentScroll = element.scrollTop + element.clientHeight;

        // Si no estamos cerca del fondo, desplazamos suavemente
        if (currentScroll < scrollHeight) {
            // El valor de desplazamiento por fotograma (ajustable)
            const step = 50; // Puedes ajustar este valor para controlar la velocidad del scroll

            // Desplazamos hacia abajo hasta el final
            element.scrollBy(0, step);  // 0 en el eje X, desplazamiento en el eje Y

            // Continuamos desplazando hasta que lleguemos al fondo
            requestAnimationFrame(() => scrollToBottom(element));
        }
    }

    /* =========================
       DROPDOWN
    ========================= */

    function renderSeasons(seasons = []) {
        console.log("Renderizando temporadas:", seasons);
        seasonMenu.innerHTML = ""; // Limpiar el menú antes de volver a cargar

        if (seasons.length < 2) {
            seasonDropdown.style.display = "none";  // Ocultar el dropdown si hay menos de 2 temporadas
            return;
        }

        seasonDropdown.style.display = "block"; // Mostrar el dropdown si hay 2 o más temporadas

        seasons.forEach((season, index) => {
            const count = season.episodes?.length || 0;

            const btn = document.createElement("button");
            btn.className = "nm-season-item";
            btn.innerHTML = `
            Temporada ${index + 1} 
            <span class="episode-count">
                (${count} ${count === 1 ? "episodio" : "episodios"})
            </span>
        `;

            btn.onclick = () => {
                renderEpisodes(season);
                seasonToggle.textContent = `Temporada ${index + 1}`;
                seasonDropdown.classList.remove("open");

                // Eliminar la clase all-d-toggle cuando se elija una temporada
                const dropdownToggle = document.querySelector(".dropdown-toggle");
                if (dropdownToggle) {
                    dropdownToggle.classList.remove("all-d-toggle");
                }
            };

            seasonMenu.appendChild(btn);
        });

        // Agregar el separador antes del botón de "Ver todos los episodios"
        const separator = document.createElement("div");
        separator.className = "nm-dropdown-separator";
        seasonMenu.appendChild(separator);

        // Agregar el botón de "Ver todos los episodios"
        const allBtn = document.createElement("button");
        allBtn.className = "nm-season-item nm-all";
        allBtn.textContent = "Ver todos los episodios";

        allBtn.onclick = () => {
            renderAllEpisodes(seasons);
            seasonToggle.textContent = "Ver todos los episodios";
            seasonDropdown.classList.remove("open");

            // Añadir la clase all-d-toggle al botón "Ver todos los episodios"
            const dropdownToggle = document.querySelector(".dropdown-toggle");
            if (dropdownToggle) {
                dropdownToggle.classList.add("all-d-toggle");
            }
        };

        seasonMenu.appendChild(allBtn);

        seasonToggle.textContent = "Temporada 1";
    }

    /* =========================
       ⭐ META (AGE RATING BADGE)
    ========================= */

    function renderMeta(data) {
        console.log("Renderizando meta de la película/serie:", data);
        yearEl.textContent = data.year || "";
        durationEl.textContent = data.duration || "";

        ratingEl.innerHTML = "";

        const raw = data.ageRating || data.rating;
        if (!raw) return;

        // separa "16+" del resto
        const match = raw.match(/^(\d+\+)\s*(.*)$/);

        if (!match) {
            ratingEl.textContent = raw;
            return;
        }

        const [, badgeText, descText] = match;

        const badge = document.createElement("span");
        badge.className = "nm-leftdata-ageRating";
        badge.textContent = badgeText;

        ratingEl.appendChild(badge);

        if (descText) {
            const desc = document.createElement("span");
            desc.style.marginLeft = "8px";
            desc.style.color = "#bcbcbc";
            desc.textContent = descText;
            ratingEl.appendChild(desc);
        }
    }

    /* =========================
       FULL INFO MODAL
    ========================= */

    // Agrega más depuración en el acceso a la clave
    function getFullInfoByClave(clave) {
        console.log("Buscando datos completos para la clave:", clave);  // Verificación de la clave
        return fullInfoData[clave] || {};
    }

    function renderAbout(data, fullInfo) {
        console.log("Información completa de:", fullInfo); // Verificación de los datos completos

        if (!fullInfo) {
            document.getElementById("nmAbout").innerHTML = "No se encontró información adicional.";
            return;
        }

        // Separar la clasificación por edad si tiene el formato "n+"
        let ageRatingHTML = "";
        const rawAgeRating = fullInfo.fullage;
        if (rawAgeRating) {
            const match = rawAgeRating.match(/^(\d+\+)\s*(.*)$/);  // Busca un número con el símbolo "+" al principio

            if (match) {
                const [, badgeText, descText] = match;

                ageRatingHTML = `
                <div><b>Clasificación por edad:</b> 
                    <span class="nm-leftdata-ageRating">${badgeText}</span>
                    ${descText ? `<span>${descText}</span>` : ""}
                </div>
            `;
            } else {
                ageRatingHTML = `<div><b>Clasificación por edad:</b> ${rawAgeRating}</div>`;
            }
        }

        // Actualiza el contenido del modal
        document.getElementById("nmAbout").innerHTML = `
        <h1 id="modal-title">
            <span class="about">Acerca de</span>
            <strong class="titulo">${fullInfo.title || "No disponible"}</strong>
        </h1>
        <div id="about">
            ${fullInfo.createdBy ? `<div><b>Creado por:</b> ${fullInfo.createdBy}</div>` : ""}
            ${fullInfo.fullscript ? `<div><b>Guión:</b> ${fullInfo.fullscript}</div>` : ""}
            ${fullInfo.fullcast ? `<div><b>Elenco:</b> ${fullInfo.fullcast}</div>` : ""}
            ${fullInfo.fullgenres ? `<div><b>Géneros:</b> ${fullInfo.fullgenres}</div>` : ""}
            ${fullInfo.fulltitletype ? `<div><b>Este título es:</b> ${fullInfo.fulltitletype}</div>` : ""}
            ${ageRatingHTML}  <!-- Aquí se incluye la clasificación por edad con formato adecuado -->
        </div>
    `;
    }
    /* =========================
       MODE SWITCH (SERIE vs PELI)
    ========================= */

    function setMode({ isSeries }) {
        console.log("Cambiando al modo:", isSeries ? "Serie" : "Película");
        if (seriesBlock) seriesBlock.style.display = "";

        if (seriesHead) {
            seriesHead.style.display = isSeries ? "" : "none";
        }

        if (!isSeries) seasonDropdown?.classList.remove("open");
    }

    /* =========================
       OPEN / CLOSE
    ========================= */


    function openModal(id) {
        console.log("Abriendo el modal con la id:", id);

        const data = cardsData?.[id];
        console.log("Datos de la tarjeta:", data);

        modal.classList.add("active");
        document.body.classList.add("modal-open");


        /* =========================
           ⭐ FIX SCROLLBAR SHIFT
        ========================= */

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scrollBarWidth + "px";

        /* ========================= */


        if (!data) {
            console.error(`No se encontraron datos para la tarjeta con id: ${id}`);
            return;
        }

        const clave = data.id;
        console.log("Clave para obtener información:", clave);

        const fullInfo = fullInfoData?.[clave];
        currentFullInfo = fullInfo;
        console.log("Datos completos del modal:", fullInfo);

        if (!fullInfo) {
            console.error(`No se encontraron datos completos para el título con id: ${id}`);
            return;
        }

        renderAbout(data, fullInfo);
        if (data.curiosity && data.curiosity.trim() !== "") {
            curiosity.textContent = data.curiosity;
            curiosity.style.display = "";
        } else {
            curiosity.textContent = "";
            curiosity.style.display = "none";
        }
        synopsis.textContent = data.synopsis || "";
        castEl.textContent = (data.cast || []).join(", ");
        directorEl.textContent = (data.genres || []).join(", ");
        writerEl.textContent = (data.thisTitleIs || []).join(", ");

        renderMeta(data);
        playVideo(data.video, data.poster);


        const playButton = document.getElementById("nmPlayButton");

        if (playButton && fullInfo.url) {
            playButton.href = fullInfo.url;
        } else if (playButton) {
            playButton.href = "#";
        }


        const iconContainer = playButton.querySelector(".play-icon-container");
        if (!iconContainer) {
            const newIconContainer = document.createElement("div");
            newIconContainer.className = "play-icon-container";
            newIconContainer.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24" data-icon="PlayMedium" data-icon-id=":rav:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img">
                <path fill="currentColor" d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"></path>
            </svg>
        `;
            playButton.appendChild(newIconContainer);
        }


        const buttonText = playButton.querySelector(".play-button-text");
        if (!buttonText) {
            const newButtonText = document.createElement("span");
            newButtonText.className = "play-button-text";
            newButtonText.textContent = "Reproducir";
            playButton.appendChild(newButtonText);
        }


        const videoWrapper = document.getElementById("nmVideoWrapper");
        if (videoWrapper) {
            videoWrapper.appendChild(playButton);
        }


        if (data.seasons?.length) {
            setMode({ isSeries: true });
            renderSeasons(data.seasons);
            renderEpisodes(data.seasons[0]);
        } else {
            setMode({ isSeries: false });
            renderGridFallback();
        }


        const scrollBtn = document.createElement("a");
        scrollBtn.className = "scrollBtn";
        scrollBtn.textContent = "más";
        scrollBtn.onclick = () => scrollToBottom(modal);

        episodesWrap.appendChild(scrollBtn);
        castEl.appendChild(scrollBtn);


        /* =========================
           MUTE (SIN TOCAR SCROLL)
        ========================= */

        const muteButton = modal.querySelector(".nmMuteUnmute.bmt-mute-btn");
        const muteIcon = muteButton.querySelector("svg");

        if (!muteIcon) {
            const muteIconElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            muteIconElement.setAttribute("viewBox", "0 0 24 24");
            muteIconElement.setAttribute("width", "24");
            muteIconElement.setAttribute("height", "24");
            muteIconElement.setAttribute("aria-hidden", "true");
            muteIconElement.setAttribute("fill", "none");
            muteIconElement.setAttribute("role", "img");

            muteIconElement.innerHTML = `<path fill="currentColor" fill-rule="evenodd" d="M24 12a14 14 0 0 0-4.1-9.9l-1.41 1.41a12 12 0 0 1 0 16.98l1.41 1.41A14 14 0 0 0 24 12M11 4a1 1 0 0 0-1.7-.7L4.58 8H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3.59l4.7 4.7A1 1 0 0 0 11 20z"></path>`;
            muteButton.appendChild(muteIconElement);
        }

        muteButton.addEventListener("click", () => {
            video.muted = !video.muted;
            muteButton.classList.toggle("muted", video.muted);
        });
    }



    /* =========================
       CLOSE
    ========================= */

    function closeModal() {
        video.pause();

        modal.classList.remove("active");

        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    }

    /* =========================
       EVENTS
    ========================= */

    closeBtn?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (!e.target.closest(".nm-shell")) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    seasonToggle?.addEventListener("click", () =>
        seasonDropdown?.classList.toggle("open")
    );

    /* =========================
       LOAD
    ========================= */

    Promise.all([
        fetch("assets/json/cardsData.json").then(r => r.json()),
        fetch("assets/json/full-info-modal.json").then(r => r.json())
    ])
        .then(([cards, full]) => {
            console.log("Datos de cards cargados:", cards);
            console.log("Datos de full-info-modal cargados:", full);

            cardsData = cards;
            fullInfoData = full;

            document.querySelectorAll(".card").forEach(card => {
                card.onclick = () => openModal(card.id);  // Asegúrate de que la clave sea válida aquí
            });

        })
        .catch(console.error);

    window.openMediaModal = openModal;
})();
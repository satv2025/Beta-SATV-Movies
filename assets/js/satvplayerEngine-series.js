/* =========================
   UNIVERSAL PLAYER ENGINE
   + JSON AUTO GENERATOR
   ========================= */

document.addEventListener('DOMContentLoaded', async () => {

    const player = document.getElementById('player');
    const layout = document.getElementById('layout');
    const listContainer = document.querySelector('.episodes-list');

    if (!player || !listContainer) return;

    /* =================================================
       1️⃣ GENERAR EPISODIOS DESDE JSON (ANTES DE TODO)
    ================================================= */

    const seriesId = document.body.dataset.series; // <body data-series="nivelx">

    try {
        const res = await fetch('../assets/json/cardsData.json');
        const data = await res.json();

        const series = data[seriesId];
        if (!series) return;

        buildSeasons(series.seasons, listContainer);

    } catch (err) {
        console.error('No se pudo cargar series.json', err);
    }


    /* =================================================
       2️⃣ AHORA SÍ → PLAYER ENGINE NORMAL
    ================================================= */

    let episodes = Array.from(document.querySelectorAll('.episode'));
    let current = 0;


    /* ========= AUTOPLAY SAFE ========= */
    async function autoPlaySafe() {
        try {
            await player.play();
        } catch {
            player.muted = true;
            await player.play();
        }
    }


    /* ========= HELPERS ========= */

    function getSeasonEp(src) {
        const m = src.match(/\/t(\d+)\/E?(\d+)/i);
        if (!m) return null;
        return { season: m[1], ep: m[2] };
    }

    function refreshThumbs(vtt) {
        if (!layout || !vtt) return;

        const busted = `${vtt}?v=${Date.now()}`;
        layout.removeAttribute('thumbnails');

        requestAnimationFrame(() => {
            layout.setAttribute('thumbnails', busted);
        });
    }

    function setURL(season, ep) {
        history.replaceState(null, '', `?titledata=t${season}e${ep}`);
    }


    /* ========= LOAD EP ========= */

    function loadEpisode(index, autoplay = true) {

        const card = episodes[index];
        if (!card) return;

        current = index;

        episodes.forEach(e => e.classList.remove('active'));
        card.classList.add('active');

        const src = card.dataset.src;
        const title = card.dataset.title || card.querySelector('h3')?.textContent;

        player.src = src;
        if (title) player.title = title;

        const info = getSeasonEp(src);

        if (info) {
            setURL(info.season, info.ep);

            if (card.dataset.vtt) {
                refreshThumbs(card.dataset.vtt);
            }
        }

        if (autoplay) requestAnimationFrame(autoPlaySafe);
    }


    /* ========= URL LOAD ========= */

    function loadFromURL() {

        const params = new URLSearchParams(window.location.search);
        const td = params.get('titledata');
        if (!td) return false;

        const m = td.match(/t(\d+)e(\d+)/i);
        if (!m) return false;

        const season = m[1];
        const ep = m[2];

        const index = episodes.findIndex(card => {
            const info = getSeasonEp(card.dataset.src);
            return info && info.season === season && info.ep === ep;
        });

        if (index !== -1) {
            loadEpisode(index, true);
            return true;
        }

        return false;
    }


    /* ========= EVENTS ========= */

    episodes.forEach((ep, i) => {
        ep.addEventListener('click', () => loadEpisode(i, true));
    });

    player.addEventListener('ended', () => {
        if (current + 1 < episodes.length) {
            loadEpisode(current + 1, true);
        }
    });


    /* ========= INIT ========= */

    if (!loadFromURL()) {
        loadEpisode(0, true);
    }

});



/* =================================================
   🔥 GENERADOR HTML (DEBAJO DEL ENGINE)
================================================= */

function buildSeasons(seasons, container) {

    container.innerHTML = '';

    seasons.forEach((season, index) => {

        const seasonDiv = document.createElement('div');
        seasonDiv.className = 'episodes season';
        seasonDiv.dataset.season = season.id;

        if (index !== 0) seasonDiv.style.display = 'none';

        season.episodes.forEach(ep => {
            seasonDiv.appendChild(createEpisode(ep));
        });

        container.appendChild(seasonDiv);
    });
}


function createEpisode(ep) {

    const article = document.createElement('article');
    article.className = 'episode';
    article.dataset.src = ep.src;
    article.dataset.title = ep.title;
    article.dataset.vtt = ep.vtt || '';

    article.innerHTML = `
        <div class="ep-thumb">
            <img src="${ep.thumb || ''}" loading="lazy">
        </div>
        <div class="ep-info">
            <h3>${ep.number}. ${ep.title}</h3>
            <p>${ep.description || ''}</p>
            <span>${ep.duration || ''}</span>
        </div>
    `;

    return article;
}
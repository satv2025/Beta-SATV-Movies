/* =========================
   UNIVERSAL PLAYER ENGINE
   + cardsData.json (episodios)
   + vttVidstack.json (thumbnails)
   ========================= */

document.addEventListener('DOMContentLoaded', async () => {

    const player = document.getElementById('player');
    const layout = document.getElementById('layout');
    const listContainer = document.querySelector('.episodes-list');

    if (!player) return;

    const seriesId = document.body.dataset.series;

    let episodes = [];
    let vttMap = {};


    /* =========================================
       1️⃣ CARGAR AMBOS JSON
    ========================================= */

    try {

        const [cardsRes, vttRes] = await Promise.all([
            fetch('../assets/json/cardsData.json'),
            fetch('../assets/json/vttVidstack.json')
        ]);

        const cardsData = await cardsRes.json();
        const vttData = await vttRes.json();

        const title = cardsData[seriesId];
        const vttTitle = vttData[seriesId];

        if (!title) return;

        /* ========= CREAR MAPA RÁPIDO VTT ========= */

        if (vttTitle?.seasons) {
            vttTitle.seasons.forEach(season => {
                season.episodes.forEach(ep => {
                    vttMap[`${season.id}-${ep.number}`] = ep.vtt;
                });
            });
        }

        /* ========= GENERAR TEMPORADAS ========= */

        if (title.seasons && listContainer) {
            buildSeasons(title.seasons, listContainer, vttMap);
        }

    } catch (e) {
        console.error('Error cargando JSON:', e);
        return;
    }


    /* =========================================
       2️⃣ RELEER EPISODIOS
    ========================================= */

    episodes = Array.from(document.querySelectorAll('.episode'));
    if (!episodes.length) return;

    let current = 0;


    /* ========= AUTOPLAY SAFE ========= */

    async function autoPlaySafe() {
        try {
            await player.play();
        } catch {
            player.muted = false;
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


    /* ========= LOAD ========= */

    function loadEpisode(index) {

        const card = episodes[index];
        if (!card) return;

        current = index;

        episodes.forEach(e => e.classList.remove('active'));
        card.classList.add('active');

        player.src = card.dataset.src;

        if (card.dataset.title)
            player.title = card.dataset.title;

        const info = getSeasonEp(card.dataset.src);

        if (info) {
            setURL(info.season, info.ep);

            if (card.dataset.vtt)
                refreshThumbs(card.dataset.vtt);
        }

        requestAnimationFrame(autoPlaySafe);
    }


    /* ========= EVENTS ========= */

    episodes.forEach((ep, i) => {
        ep.addEventListener('click', () => loadEpisode(i));
    });

    player.addEventListener('ended', () => {
        if (current + 1 < episodes.length) {
            loadEpisode(current + 1);
        }
    });


    /* ========= INIT ========= */

    loadEpisode(0);

});



/* =========================================
   🔥 GENERADORES
========================================= */

function buildSeasons(seasons, container, vttMap) {

    container.innerHTML = '';

    seasons.forEach((season, index) => {

        const seasonDiv = document.createElement('div');

        seasonDiv.className = 'episodes season';
        seasonDiv.dataset.season = season.id;

        if (index !== 0)
            seasonDiv.style.display = 'none';

        season.episodes.forEach(ep => {
            seasonDiv.appendChild(createEpisode(ep, season.id, vttMap));
        });

        container.appendChild(seasonDiv);
    });
}



function createEpisode(ep, seasonId, vttMap) {

    const article = document.createElement('article');

    article.className = 'episode';

    article.dataset.src = ep.src;
    article.dataset.title = ep.title;

    /* 🔥 MATCH season + number */

    const key = `${seasonId}-${ep.number}`;

    if (vttMap[key])
        article.dataset.vtt = vttMap[key];


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
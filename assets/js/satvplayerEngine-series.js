/* =========================
   UNIVERSAL PLAYER ENGINE
   + JSON AUTO GENERATOR FIXED
   ========================= */

document.addEventListener('DOMContentLoaded', async () => {

    const player = document.getElementById('player');
    const layout = document.getElementById('layout');
    const listContainer = document.querySelector('.episodes-list');

    if (!player) return;

    /* =========================================
       1️⃣ GENERAR EPISODIOS DESDE TU JSON REAL
    ========================================= */

    const seriesId = document.body.dataset.series;

    let episodes = [];

    try {

        const res = await fetch('../assets/json/cardsData.json');
        const data = await res.json();

        const title = data[seriesId];

        /* ❌ no existe */
        if (!title) {
            console.warn('Serie no encontrada:', seriesId);
            return;
        }

        /* 🎬 es película → no generar episodios */
        if (!title.seasons || !listContainer) {
            console.log('Película detectada → sin episodios');
        }

        /* 📺 es serie */
        if (title.seasons) {
            buildSeasons(title.seasons, listContainer);
        }

    } catch (e) {
        console.error('Error cargando JSON:', e);
        return;
    }


    /* =========================================
       2️⃣ RELEER EPISODES YA GENERADOS
    ========================================= */

    episodes = Array.from(document.querySelectorAll('.episode'));
    if (!episodes.length) return;

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


    /* ========= LOAD ========= */

    function loadEpisode(index, autoplay = true) {

        const card = episodes[index];
        if (!card) return;

        current = index;

        episodes.forEach(e => e.classList.remove('active'));
        card.classList.add('active');

        player.src = card.dataset.src;

        if (card.dataset.title) player.title = card.dataset.title;

        const info = getSeasonEp(card.dataset.src);

        if (info) {
            setURL(info.season, info.ep);

            if (card.dataset.vtt) refreshThumbs(card.dataset.vtt);
        }

        if (autoplay) requestAnimationFrame(autoPlaySafe);
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
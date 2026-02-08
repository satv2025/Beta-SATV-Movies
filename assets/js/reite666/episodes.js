function generateReite(season, total) {

    const container = document.getElementById(`reite-t${season}`);
    if (!container) return;

    for (let i = 1; i <= total; i++) {

        const filename = season === 1
            ? `REITE666%20T1%20E${i}`
            : `${i}`;

        container.insertAdjacentHTML('beforeend', `
      <article class="episode"
        data-src="https://cdn.jsdelivr.net/gh/satv2025/media@main/videos/reite666/t${season}/E${i}/${filename}.m3u8"
        data-vtt="https://movies.solargentinotv.com.ar/assets/media/reite666-episode-plyr-thumbnails/t${season}/e${i}/thumbs.vtt"
        data-title="T${season}E${i}">
      </article>
    `);
    }
}

generateReite(1, 20);
generateReite(2, 25);
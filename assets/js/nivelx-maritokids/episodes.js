function generateNivelX(season, total) {

    const container = document.getElementById(`nivelx-t${season}`);

    for (let i = 1; i <= total; i++) {

        container.insertAdjacentHTML('beforeend', `
      <article class="episode"
        data-src="https://cdn.jsdelivr.net/gh/satv2025/media@main/videos/nivelx/t${season}/E${i}/${i}.m3u8"
        data-vtt="https://movies.solargentinotv.com.ar/assets/media/nivelx-episode-thumbnails/t${season}/e${i}/thumbs.vtt"
        data-title="T${season}E${i}">
      </article>
    `);
    }
}

/* 👇 EDITÁS SOLO ACÁ */
generateNivelX(1, 29);
generateNivelX(2, 3);
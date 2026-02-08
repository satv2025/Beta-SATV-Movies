function generateAPP(season, total) {

    const container = document.getElementById(`app-t${season}`);

    for (let i = 1; i <= total; i++) {

        container.insertAdjacentHTML('beforeend', `
      <article class="episode"
        data-src="https://cdn.jsdelivr.net/gh/satv2025/media@main/videos/app/t${season}/E${i}/${i}.m3u8"
        data-vtt="https://movies.solargentinotv.com.ar/assets/media/app-episode-thumbnails/t${season}/e${i}/thumbs.vtt"
        data-title="T${season}E${i}">
      </article>
    `);
    }
}

/* 👇 EDITÁS SOLO ACÁ */
generateAPP(1, 6);
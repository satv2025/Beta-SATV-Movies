document.addEventListener('DOMContentLoaded', () => {

    function generateAPP(total) {

        const container = document.getElementById('app-t1');
        if (!container) return;

        for (let i = 1; i <= total; i++) {

            // 👉 nombre real de archivo
            const filename = (i === 1)
                ? `Asesinato%20Para%20Principiantes%20-%20T1%20E1`
                : `Asesinato-Para-Principiantes-T1-E${i}`;

            container.insertAdjacentHTML('beforeend', `
        <article class="episode"
          data-src="https://cdn.jsdelivr.net/gh/satv2025/media@main/videos/app/e${i}/${filename}.m3u8"
          data-vtt="https://movies.solargentinotv.com.ar/assets/media/app-episode-thumbnails/t1/e${i}/thumbs.vtt"
          data-title="T1E${i}">
        </article>
      `);
        }
    }

    generateAPP(6);

});
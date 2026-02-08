document.addEventListener('DOMContentLoaded', () => {

    function generateNivelX(season, total) {

        const container = document.getElementById(`nivelx-t${season}`);
        if (!container) return;

        for (let i = 1; i <= total; i++) {

            container.insertAdjacentHTML('beforeend', `
        <article class="episode"
          data-src="https://cdn.jsdelivr.net/gh/satv2025/media@main/videos/nivelx-maritokids/t${season}/E${i}/playlist.m3u8"
          data-title="Programa ${i}">
        </article>
      `);
        }
    }

    // 👇 SOLO editás cantidades
    generateNivelX(1, 29);
    generateNivelX(2, 3);

});
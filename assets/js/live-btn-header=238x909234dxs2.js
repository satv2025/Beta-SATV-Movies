const streamURL = "https://rtmp.solargentinotv.com.ar/live/canal1.m3u8";
const vivoBtn = document.getElementById("vivoBtn");

vivoBtn.addEventListener("click", () => {
    window.location.href = "/vivo";
});

let isLive = false;

async function checkLiveStream() {
    try {
        // cache busting para evitar respuestas guardadas
        const url = streamURL + "?t=" + Date.now();

        const response = await fetch(url, {
            method: "GET",
            cache: "no-store"
        });

        if (!response.ok) throw new Error("offline");

        const text = await response.text();

        // detección real de segmentos
        if (text.includes("#EXTINF")) {
            if (!isLive) {
                isLive = true;
                vivoBtn.style.display = "inline-flex";
            }
            return;
        }
    } catch (e) { }

    // si llega acá → stream apagado
    if (isLive) {
        isLive = false;
        vivoBtn.style.display = "none";
    }
}

// primera detección inmediata
checkLiveStream();

// detección casi en tiempo real
setInterval(checkLiveStream, 5000);

// vuelve a chequear cuando el usuario regresa a la pestaña
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        checkLiveStream();
    }
});
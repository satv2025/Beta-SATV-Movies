// Filtrado de las tarjetas según el botón que se haga clic
document.querySelectorAll(".filters button, .nav-link").forEach(b => {
    b.onclick = (event) => {
        // Si el enlace es "VIVO", redirigir sin aplicar el filtro
        if (b.classList.contains('vivo-btn')) {
            window.location.href = "/vivo"; // Redirigir a /vivo
            event.preventDefault(); // Prevenir la acción de filtrado
            return;
        }

        applyFilter(b.dataset.filter, b); // Aplicar filtro
    };
});

// Función que aplica el filtro a las tarjetas
function applyFilter(filter, source) {
    // Activar el botón del filtro seleccionado
    document.querySelectorAll(".filters button, .nav-link")
        .forEach(b => b.classList.remove("active"));
    source.classList.add("active");

    // Filtrar las tarjetas según el filtro seleccionado
    const cards = document.querySelectorAll(".card");
    cards.forEach(c => {
        c.style.display = filter === "all" || c.dataset.type === filter
            ? "block"
            : "none";
    });
}
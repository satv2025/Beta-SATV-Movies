// Filtrado de las tarjetas según el botón que se haga clic
document.querySelectorAll(".filters button, .nav-link").forEach(b => {
    b.onclick = () => applyFilter(b.dataset.filter, b);
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
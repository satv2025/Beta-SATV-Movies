function go(url) {
    window.location.href = url;
}

/* SEARCH */
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
    const v = searchInput.value.toLowerCase();
    cards.forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(v) ? "block" : "none";
    });
});

/* FILTERS (BOTONES) */
document.querySelectorAll(".filters button").forEach(b => {
    b.onclick = () => applyFilter(b.dataset.filter, b);
});

/* NAV (MISMA LÓGICA QUE FILTERS) */
document.querySelectorAll(".nav .nav-link").forEach(n => {
    n.onclick = () => applyFilter(n.dataset.filter, n);
});

/* FUNCIÓN CENTRAL */
function applyFilter(filter, source) {

    // nav active
    document.querySelectorAll(".nav .nav-link")
        .forEach(n => n.classList.remove("active"));
    if (source.classList.contains("nav-link")) source.classList.add("active");

    // filters active
    document.querySelectorAll(".filters button")
        .forEach(b => b.classList.remove("active"));
    document.querySelector(`.filters button[data-filter="${filter}"]`)?.classList.add("active");

    // filtrar cards
    cards.forEach(c => {
        c.style.display = filter === "all" || c.dataset.type === filter
            ? "block"
            : "none";
    });
}
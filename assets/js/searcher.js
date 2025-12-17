document.getElementById("searchInput").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase(); // Usamos el título de la tarjeta
        const description = card.querySelector(".synopsis").textContent.toLowerCase(); // Usamos la descripción de la tarjeta
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const jsonData = JSON.parse(localStorage.getItem("jsonData"));

  if (jsonData) {
    console.log(jsonData);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  if (type) {
    createCardAndRedirect(type);
  }
});

function handleCarouselClick() {
  let currentIndex = parseInt(this.dataset.index, 10);
  const images = JSON.parse(this.dataset.images);

  // Incrementer l'index et boucler si nécessaire
  currentIndex = (currentIndex + 1) % images.length;

  this.src = images[currentIndex];
  this.dataset.index = currentIndex; // mise à jour de l'index stocké
}

function createCardAndRedirect(type) {
  const piecesContainer = document.getElementById("pieces-container");
  const jsonData = JSON.parse(localStorage.getItem("jsonData"));

  if (jsonData) {
    const filteredData = jsonData.filter((item) => item.type.includes(type));

    filteredData.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      if (Array.isArray(item.image)) {
        image.src = item.image[0];
        image.dataset.index = 0;
        image.dataset.images = JSON.stringify(item.image);

        image.addEventListener("click", handleCarouselClick);
      } else {
        image.src = item.image;
      }
      card.appendChild(image);

      const title = document.createElement("h2");
      title.textContent = item.titre;
      card.appendChild(title);

      const description = document.createElement("p");
      description.textContent = item.description;
      description.classList.add("description");
      card.appendChild(description);

      const addToCart = document.createElement("p");
      addToCart.innerHTML =
        'Ajouter au panier <i class="fa-solid fa-basket-shopping"></i>';
      addToCart.classList.add("card-panier");
      card.appendChild(addToCart);

      piecesContainer.appendChild(card);
    });
  }
}

// MODALE

document.addEventListener("click", function (event) {
  if (event.target.closest(".card")) {
    const cardContent = event.target.closest(".card").cloneNode(true);
    const modalContent = document.getElementById("modal-content");

    // Vider le contenu précédent de la modale
    while (modalContent.firstChild) {
      modalContent.removeChild(modalContent.firstChild);
    }

    modalContent.appendChild(cardContent);

    // Réattacher l'écouteur d'événements pour le carrousel
    const modalImage = modalContent.querySelector("img");
    if (modalImage && modalImage.dataset.images) {
      modalImage.addEventListener("click", handleCarouselClick);
    }

    document.getElementById("modal").style.display = "flex";
  }
});

document.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");

  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", function (event) {
  const modal = document.getElementById("modal");

  if (event.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
  }
});

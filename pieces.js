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

  currentIndex = (currentIndex + 1) % images.length;

  this.src = images[currentIndex];
  this.dataset.index = currentIndex;

  const bullets = this.parentElement.querySelectorAll(".bullet");
  bullets.forEach((bullet) => bullet.classList.remove("active"));
  bullets[currentIndex].classList.add("active");
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

document.addEventListener("click", function (event) {
  if (event.target.closest(".card")) {
    const cardContent = event.target.closest(".card").cloneNode(true);
    const modalContent = document.getElementById("modal-content");

    while (modalContent.firstChild) {
      modalContent.removeChild(modalContent.firstChild);
    }

    const modalImage = cardContent.querySelector("img");
    if (modalImage && modalImage.dataset.images) {
      modalImage.addEventListener("click", handleCarouselClick);

      // Check if bulletsContainer doesn't already exist
      let bulletsContainer = cardContent.querySelector(".bullets-container");
      if (!bulletsContainer) {
        bulletsContainer = document.createElement("div");
        bulletsContainer.classList.add("bullets-container");
        const images = JSON.parse(modalImage.dataset.images);
        images.forEach((img, index) => {
          const bullet = document.createElement("span");
          bullet.classList.add("bullet");
          if (index === parseInt(modalImage.dataset.index, 10))
            bullet.classList.add("active");
          bulletsContainer.appendChild(bullet);
        });
        cardContent.insertBefore(bulletsContainer, modalImage.nextSibling); // Insert bulletsContainer after the modalImage
      }
    }

    modalContent.appendChild(cardContent);
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

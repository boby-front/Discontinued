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

function createCardAndRedirect(type) {
  const piecesContainer = document.getElementById("pieces-container");
  const jsonData = JSON.parse(localStorage.getItem("jsonData"));

  if (jsonData) {
    const filteredData = jsonData.filter((item) => item.type.includes(type));

    filteredData.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      if (Array.isArray(item.image) && item.image.length > 1) {
        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        const carouselImages = document.createElement("div");
        carouselImages.classList.add("carousel-images");
        const carouselBullets = document.createElement("div");
        carouselBullets.classList.add("carousel-bullets");

        item.image.forEach((imgSrc, index) => {
          const image = document.createElement("img");
          image.src = imgSrc;
          carouselImages.appendChild(image);

          // Création des bullet points
          const bullet = document.createElement("span");
          bullet.classList.add("carousel-bullet");
          if (index === 0) {
            bullet.classList.add("active");
          }
          carouselBullets.appendChild(bullet);
        });

        carousel.appendChild(carouselImages);
        carousel.appendChild(carouselBullets);

        card.appendChild(carousel);
      } else {
        const image = document.createElement("img");
        image.src = Array.isArray(item.image) ? item.image[0] : item.image;
        card.appendChild(image);
      }

      const title = document.createElement("h2");
      title.textContent = item.titre;
      card.appendChild(title);

      const description = document.createElement("p");
      description.textContent = item.description;
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

//Caroussel gestion du click

document.addEventListener("click", function (event) {
  if (event.target.closest(".carousel")) {
    const carousel = event.target.closest(".carousel");
    const currentImage = carousel.querySelector(
      'img:not([style*="display: none"])'
    );
    const nextImage =
      currentImage.nextElementSibling ||
      carousel.querySelector("img:first-child");

    // Gestion des bullet points
    const bullets = carousel.querySelectorAll(".carousel-bullet");
    let currentBulletIndex = [...carousel.querySelectorAll("img")].indexOf(
      currentImage
    );
    bullets[currentBulletIndex].classList.remove("active");

    currentBulletIndex = (currentBulletIndex + 1) % bullets.length;
    bullets[currentBulletIndex].classList.add("active");

    currentImage.style.display = "none";
    nextImage.style.display = "block";
  }
});

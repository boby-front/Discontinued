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

      const image = document.createElement("img");
      image.src = item.image;
      card.appendChild(image);

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

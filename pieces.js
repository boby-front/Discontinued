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
      image.src = item.image; // Assurez-vous que la propriété "image" contient l'URL de l'image
      card.appendChild(image);

      const title = document.createElement("h2");
      title.textContent = item.titre;
      card.appendChild(title);

      const description = document.createElement("p");
      description.textContent = item.description;
      card.appendChild(description);

      const typeVehicule = document.createElement("h2");
      typeVehicule.textContent = item.type;
      typeVehicule.classList.add("card-type-word");
      card.appendChild(typeVehicule);

      const icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-basket-shopping", "card-panier");
      card.appendChild(icon);

      piecesContainer.appendChild(card);
    });
  }
}

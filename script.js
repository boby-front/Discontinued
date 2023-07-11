// Enleve le placeholder au Click

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("focus", function () {
  this.placeholder = "";
});

searchInput.addEventListener("blur", function () {
  this.placeholder = "Saisissez votre texte...";
});

// Chargement des données depuis le fichier data.json
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Création des listes vides pour chaque catégorie
    let voitureTypes = [];
    let motoTypes = [];
    let cinqZeroCCTypes = [];

    // Parcours des données pour extraire les types de véhicules en fonction de leur catégorie
    for (let i = 0; i < data.length; i++) {
      const categorie = data[i].categorie;
      const types = data[i].type;

      // Ajout du type de véhicule à la liste correspondante
      if (categorie === "Voiture") {
        voitureTypes = voitureTypes.concat(types);
      } else if (categorie === "Moto") {
        motoTypes = motoTypes.concat(types);
      } else if (categorie === "50CC") {
        cinqZeroCCTypes = cinqZeroCCTypes.concat(types);
      }
    }

    // Intégration des types de véhicules dans les éléments de liste correspondants
    const voitureList = document.querySelector(".menu-voiture");
    voitureTypes.forEach((type) => {
      const liElement = document.createElement("li");
      liElement.textContent = type;
      voitureList.appendChild(liElement);
    });

    const motoList = document.querySelector(".menu-moto");
    motoTypes.forEach((type) => {
      const liElement = document.createElement("li");
      liElement.textContent = type;
      motoList.appendChild(liElement);
    });

    const cinqZeroCCList = document.querySelector(".menu-50cc");
    cinqZeroCCTypes.forEach((type) => {
      const liElement = document.createElement("li");
      liElement.textContent = type;
      cinqZeroCCList.appendChild(liElement);
    });
  })
  .catch((error) => console.log(error));

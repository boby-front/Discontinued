// Enleve le placeholder au Click

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("focus", function () {
  this.placeholder = "";
});

searchInput.addEventListener("blur", function () {
  this.placeholder = "Saisissez votre texte...";
});

// CHARGEMENT DES DONNES DEPUIS LE FICHIER DATA

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Stockez les données dans la variable globale
    localStorage.setItem("jsonData", JSON.stringify(data));
    console.log(localStorage);

    // Création des ensembles vides pour chaque catégorie
    const voitureTypes = new Set();
    const motoTypes = new Set();
    const cinqZeroCCTypes = new Set();

    // Parcours des données pour extraire les types de véhicules en fonction de leur catégorie
    data.forEach((item) => {
      const categorie = item.categorie;
      const types = item.type;

      // Ajout du type de véhicule à l'ensemble correspondant
      if (categorie === "Voiture") {
        types.forEach((type) => voitureTypes.add(type));
      } else if (categorie === "Moto") {
        types.forEach((type) => motoTypes.add(type));
      } else if (categorie === "50CC") {
        types.forEach((type) => cinqZeroCCTypes.add(type));
      }
    });

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

    // Amene sur les li sur la page pieces.html //
    const voitureMenuItems = document.querySelectorAll(".menu-voiture li ");
    const motoMenuItems = document.querySelectorAll(".menu-moto li");
    const cinqZeroCCMenuItems = document.querySelectorAll(".menu-50cc li");

    voitureMenuItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const type = item.textContent;
        window.location.href = `pieces.html?type=${encodeURIComponent(type)}`;
      });
    });

    motoMenuItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const type = item.textContent;
        window.location.href = `pieces.html?type=${encodeURIComponent(type)}`;
      });
    });

    cinqZeroCCMenuItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const type = item.textContent;
        window.location.href = `pieces.html?type=${encodeURIComponent(type)}`;
      });
    });
  })
  .catch((error) => console.log(error));

// HOVER MENU DEROULANT

// Voiture menu

const carContainer = document.querySelector(".menu-car-container");
const menuVoiture = document.querySelector(".menu-voiture");

carContainer.addEventListener("mouseover", () => {
  menuVoiture.style.display = "block";
});

carContainer.addEventListener("mouseleave", () => {
  menuVoiture.style.display = "none";
});

menuVoiture.addEventListener("mouseenter", () => {
  menuVoiture.style.display = "block";
});

menuVoiture.addEventListener("mouseleave", () => {
  menuVoiture.style.display = "none";
});

// Moto menu

const motoContainer = document.querySelector(".menu-moto-container");
const menuMoto = document.querySelector(".menu-moto");

motoContainer.addEventListener("mouseover", () => {
  menuMoto.style.display = "block";
  menuMoto.style.left = "50%";
  menuMoto.style.transform = "translateX(-50%)";
});

motoContainer.addEventListener("mouseleave", () => {
  menuMoto.style.display = "none";
});

menuMoto.addEventListener("mouseenter", () => {
  menuMoto.style.display = "block";
});

menuMoto.addEventListener("mouseleave", () => {
  menuMoto.style.display = "none";
});

// 50cc menu

const cinqZeroCCContainer = document.querySelector(".menu-50cc-container");
const menuCinqZeroCC = document.querySelector(".menu-50cc");

cinqZeroCCContainer.addEventListener("mouseover", () => {
  menuCinqZeroCC.style.display = "block";
  menuCinqZeroCC.style.right = "0";
});

cinqZeroCCContainer.addEventListener("mouseleave", () => {
  menuCinqZeroCC.style.display = "none";
});

menuCinqZeroCC.addEventListener("mouseenter", () => {
  menuCinqZeroCC.style.display = "block";
});

menuCinqZeroCC.addEventListener("mouseleave", () => {
  menuCinqZeroCC.style.display = "none";
});

// Ajouts des Cards-pieces //

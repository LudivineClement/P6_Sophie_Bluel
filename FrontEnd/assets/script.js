// création de variables globales pour la section filtre et galerie

const filter = document.createElement("div");
filter.classList.add("filter");
portfolio.appendChild(filter);

const gallery = document.createElement("div");
gallery.classList.add("gallery");
portfolio.appendChild(gallery);

// fonction pour créer dynamiquement les filtres et les rendre fonctionnel
function filters(lst) {
  for (let i = 0; i < lst.length; i++) {
    const lstFilters = document.createElement("div");
    lstFilters.classList.add("button");
    filter.appendChild(lstFilters);
    if (i != 0) {
      lstFilters.innerHTML = lst[i].category.name;
    } else {
      lstFilters.innerHTML = "Tous";
    }

    lstFilters.addEventListener("click", () => {
      if (i != 0) {
        lstProjectsFilter = lstProjects.filter((el) => el.categoryId == i);
        createGalery(lstProjectsFilter);
      } else {
        createGalery(lstProjects);
      }
    });
  }
}

// Fonction pour la création des éléments de la galerie

function createGalery(lst) {
  gallery.innerHTML = "";

  for (let i = 0; i < lst.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = lst[i].imageUrl;
    img.alt = lst[i].title;

    figure.appendChild(img);

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = lst[i].title;
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}

// fonction pour récupérer le works, puis pouvoir ajouter les catégories, la galerie et enlever les doublons

function getWorks() {
  fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      lstProjects = data;

      jsonObject = lstProjects.map(JSON.stringify);
      uniqueSet = new Set(jsonObject);
      uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      console.log(uniqueArray);
      let deleteCategory = uniqueArray.splice(4, 8);
      filters(uniqueArray);
      createGalery(lstProjects);
    });
}
getWorks();

// page connexion

// const emailUser = document.querySelector("#email");
// const passwordUser = document.querySelector("#password");

// const user = {
//   email: emailUser,
//   password: passwordUser,
// };

// //fonction
// async function login() {
//   await fetch("http://localhost:5678/api/users/login", {
//     method: "POST",
//     headers: {
//       " Accept": "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   });
// }

// fonction pour récupérer le works et enlever les doublons
let lstProjects = [];
let newArray = [];

const init = () => {
  getWorks();
};

init();

async function getWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      lstProjects = data;

      // newArray = new Set([...data]);

      // console.log("myset", newArray);

      jsonObject = lstProjects.map(JSON.stringify);
      set = new Set(jsonObject);
      console.log("set", set);
      newArray = Array.from(set).map(JSON.parse);
      console.log("tab", newArray);
      let deleteCategory = newArray.splice(3, 8);
    })
    .then(() => {
      createCategory();
      createGalery(lstProjects);
    });
}

// fonction pour créer les catégories et rendre fonctionnel les filtres
const createCategory = () => {
  const filter = document.createElement("div");
  filter.classList.add("filter");
  portfolio.appendChild(filter);

  filter.innerHTML =
    `<div class="button" id="0">Tous</div>
  ` +
    newArray
      .map(
        (categories) =>
          `<div class="button" id="${categories.category.name}">${categories.category.name}</div>`
      )
      .join("");

  let btnFilter = document.querySelectorAll(".button");
  for (let i = 0; i < btnFilter.length; i++) {
    btnFilter[i].addEventListener("click", () => {
      if (i != 0) {
        lstProjectsFilter = lstProjects.filter((el) => el.categoryId == i);
        createGalery(lstProjectsFilter);
      } else {
        createGalery(lstProjects);
      }
    });
  }
};

// fonction pour créer la galerie

const createGalery = (lst) => {
  let gallery = document.getElementsByClassName("gallery")[0];

  if (gallery == undefined) {
    gallery = document.createElement("div");
    gallery.classList.add("gallery");
  }

  gallery.innerHTML = lst
    .map(
      (img) =>
        `<figure>
    <img src=${img.imageUrl} alt=${img.title}>
    <figcaption>${img.title}</figcaption>
  </figure>
  `
    )
    .join("");

  portfolio.appendChild(gallery);
};

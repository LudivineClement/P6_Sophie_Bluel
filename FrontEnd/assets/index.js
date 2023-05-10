// fonction pour récupérer la galerie et les catégories
let lstGallery = [];
let lstCategories = [];

const init = () => {  
  getWorks();
  if(document.querySelector('.logout')!=null){
    document.querySelector('.logout').addEventListener("click", ()=> localStorage.removeItem('user'));
    }
};

const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      lstGallery = data;     
    })
  await fetch("http://localhost:5678/api/categories")
  .then((res) => res.json())
  .then((data) => {
    lstCategories = data;
      
  }).then(() => {
    createCategory();
    createGallery(lstGallery);
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
    lstCategories
      .map(
        (categories) =>
        
          `<div class="button" id="${categories.name}">${categories.name}</div>`
      )
      .join("");

  let btnFilter = document.querySelectorAll(".button");
  for (let i = 0; i < btnFilter.length; i++) {
    btnFilter[i].addEventListener("click", () => {
      if (i != 0) {
        lstGalleryFilter = lstGallery.filter((el) => el.categoryId == i);
        createGallery(lstGalleryFilter);
      } else {
        createGallery(lstGallery);
      }
    });
  }
};

// fonction pour créer la galerie

let gallery = document.querySelector('.gallery')
gallery = document.createElement("div");
gallery.classList.add("gallery");

const createGallery = (lst) => {
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

init();

// ---------------- Apparition de la modal

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const galleryModal = document.querySelector('.gallery_modal')
const btnAdd = document.querySelector('.button_modal')
const modal1 = document.querySelector('.modal1')
const modal2 = document.querySelector('.modal2')

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal)
)

function toggleModal(){
  modalContainer.classList.toggle("active")
  createGalleryModal(lstGallery)
}

// fonction pour faire apparaitre la galerie dans la modale
function createGalleryModal(elt) {
  galleryModal.innerHTML = elt .map(
    (img) =>
      `<div class="img_modal">
        <img src=${img.imageUrl} alt=${img.title}>
        <img src="assets/icons/Group 9.svg" alt="" class="icon2_modal"> 
        <figcaption>éditer</figcaption>
</div> `
  )
  .join("");

  let iconDelete = document.querySelectorAll(".icon2_modal");
  for (let i = 0; i < iconDelete.length; i++) {
  iconDelete[i].addEventListener('click', ()=> console.log('test'));
  }
  
}

// fonction pour supprimer des projets



//------- Ajouter des projets

 // btnAdd.addEventListener('click',() => modal2.style.display = "block");




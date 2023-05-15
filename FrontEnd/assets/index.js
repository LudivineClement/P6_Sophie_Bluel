//------------------------- fonction pour récupérer la galerie et les catégories
let lstGallery = [];
let lstCategories = [];

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

// -------------------------- fonction pour créer les catégories et rendre fonctionnel les filtres
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

//------------------------- fonction pour créer la galerie

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

getWorks();

const logout = document.querySelector('.logout')
//console.log(logout);
logout?.addEventListener("click", ()=> localStorage.removeItem('user'));

// ---------------- Apparition de la modal-------------------------------//

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modal = document.querySelector('.modal');
const galleryModal = document.querySelector('.gallery_modal');

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal)
)

function toggleModal(){
  modalContainer.classList.toggle("active")
  createGalleryModal(lstGallery)
}

// ---------------------fonction pour faire apparaitre la galerie dans la modale------------//

function createGalleryModal(elt) {
  galleryModal.innerHTML = elt .map(
    (img) =>
      `<div class="img_modal">
        <img src=${img.imageUrl} alt=${img.title} data-id=${img.id}>
        <img src="assets/icons/Group 9.svg" alt="" class="icon_delete" data-id=${img.id}> 
        <figcaption>éditer</figcaption>
</div> `
  )
  .join("");

  let iconsDelete = document.querySelectorAll(".icon_delete");
  for (let iconDelete of iconsDelete) {
  iconDelete.addEventListener('click', deleteProject)
  } 
}

//------------------------- fonction pour supprimer des projets-------------------------//

async function deleteProject () {
  let id = this.dataset.id;
 await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "*/*",
          "Authorization": "Bearer " + localStorage.user,
        },
      }).then(alert('Voulez-vous vraiment supprimer ce projet ?'))
}

//---------------- AJOUTS DE PROJETS----------------------------//

//initialisation de variables globales des éléments du formulaire utilisés dans plusieurs fonctions
const formUploadImg = document.createElement('form');

const labelFile = document.createElement('label');
labelFile.classList.add('form_add_photo');

const modalTitle = document.querySelector(".modalTitle");

const input_file = document.createElement('input');
input_file.classList.add('input_file');

const inputTitle = document.createElement('input');
const selectCategories = document.createElement('select');
const btnValidate = document.createElement('button');

const btnAdd = document.querySelector('.button_add_gallery');
btnAdd?.addEventListener('click', removeModalGallery);

// fonction pour vider le contenu de la modal "galerie photo"

function removeModalGallery() {
 galleryModal.style.display = "none";
 modalTitle.style.display = "none";
 document.querySelector(".link_modal").style.display = "none";
 btnAdd.style.display = "none";
 document.querySelector('hr').style.display = "none";

 UploadFile();

}

// fonction pour afficher les éléments de la modal "ajout photo"
function UploadFile () {
  const arrowModal = document.querySelector(".arrow-modal")
  arrowModal.style.display = "block";

  modalTitle.style.display = "block";
  modalTitle.style.margin = " 20px 0 30px";
  modalTitle.textContent = "Ajout Photo";

  formUploadImg.classList.add('form_upload_img');
  modal.appendChild(formUploadImg);

  labelFile.setAttribute("for", "file");
  formUploadImg.appendChild(labelFile);

  input_file.id = "file";
  input_file.type = "file";
  input_file.accept = "image/png, image/jpeg";
  input_file.style.display = "none";
  formUploadImg.appendChild(input_file);

  const imgForm = document.createElement('img');
  imgForm.src="assets/icons/add_pic.svg";
  labelFile.appendChild(imgForm);

  const btnAddFiles = document.createElement('span');
  btnAddFiles.classList.add('button_add_picture');
  btnAddFiles.textContent= '+ Ajouter photo';
  labelFile.appendChild(btnAddFiles);

  const formatFiles = document.createElement('span');
  formatFiles.classList.add('format_picture');
  formatFiles.textContent= 'jpg, png: 4mo max';
  labelFile.appendChild(formatFiles);

  const labelTitle = document.createElement('label');
  labelTitle.setAttribute("for", "title_picture");
  labelTitle.textContent= "Titre";
  formUploadImg.appendChild(labelTitle);

  inputTitle.type = "text";
  inputTitle.id = "title_picture";
  inputTitle.name = "title_picture";
  formUploadImg.appendChild(inputTitle);

  const labelCategories = document.createElement('label');
  labelCategories.setAttribute("for", "categories");
  labelCategories.textContent= "Catégories";
  formUploadImg.appendChild(labelCategories);

  selectCategories.name= "categories";
  selectCategories.id= "categories";
  formUploadImg.appendChild(selectCategories);

  const formHR = document.createElement('hr');
  formUploadImg.appendChild(formHR);

  btnValidate.classList.add('button_validate');
  btnValidate.textContent = 'Valider';
  formUploadImg.appendChild(btnValidate);

}


// faire apparaitre la miniature de l'image uploaded dans le formulaire avant validation, récupérer l'image de l'utilisateur dans une variable (file) et l'ajouter au formulaire pr l'envoyer vers la base de données.

input_file?.addEventListener("change", previewFile);

function previewFile() {
  const file_extension_regex = /\.(jpe?g|png)$/i;
  if(this.files.length === 0 || !file_extension_regex.test(this.files[0].name) || this.files[0].size < 40000) {
    return;
  }

  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);
  file_reader.addEventListener('load', (e) => displayImg(e, file));

  // Sounission du formulaire et envoie du projet vers la base de données

  formUploadImg.addEventListener('submit', addProject);

  function addProject (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', inputTitle.value);
    formData.append('category', selectCategories.value);

    fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + localStorage.user,
        },
        body:formData,
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
}


//fonction pour créer l'image, et l'intégrer dans le label

function displayImg (e, file) {
  labelFile.style.padding = "0px";

  const img_element = document.createElement('img');
  img_element.classList.add('img_uploaded')
  img_element.src= e.target.result;
  labelFile.innerHTML="";
  labelFile.appendChild(img_element);
  
  categoriesSelect(lstCategories);

}

// Sélectionner une catégorie pour l'image à envoyer
function categoriesSelect (categories) {
  const categorySelect =  document.getElementById('categories');
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent= category.name;
    categorySelect.appendChild(option);
  });

}










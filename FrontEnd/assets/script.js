const gallery = document.querySelector(".gallery");
const all = document.querySelector(".all");
const objet = document.querySelector(".objet");
const appartement = document.querySelector(".appartement");
const hotel = document.querySelector(".hotel");

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src += data[i].imageUrl;
      figure.appendChild(img);

      const figcaption = document.createElement("figcaption");
      figcaption.innerHTML += data[i].title;
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }

    console.log(gallery);
  });

//.then((data) => console.log(data[3].imageUrl));

async function login() {
  let emailLogin = document.getElementById("email").value;
  let passwordLogin = document.getElementById("password").value;

  const user = {
    email: emailLogin,
    password: passwordLogin,
  };

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body:JSON.stringify(user),
  })
    .then((res) =>{
      if(res.ok) {
        res.json().then((userData) =>
        console.log(userData)) 
        } 
    })
    
}

// let error = "identifiants incorrects";
const btnForm = document.querySelector(".connexion");
btnForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

// document.location.href("edit.html");
// else {
//   document.querySelector(".error").innerHTML = error;
// }

// .then((res) => {
//   if (res.ok) {
//     res.json().then((data) => console.log(data));
//   }

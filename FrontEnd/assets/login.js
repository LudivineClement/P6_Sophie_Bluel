let userData = {}

function redirection(){
  document.location.href="edit.html"; 
}

async function login() {
  const emailLogin = document.getElementById("email").value;
  const passwordLogin = document.getElementById("password").value;

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
        res.json()
        .then((data) => {
          userData = data.token;
        }).then(() => redirection()); 
        } else {
          const error = "identifiants incorrects";
          document.querySelector(".error").innerHTML = error;
        }
    })    
}

const btnForm = document.querySelector(".connexion");
btnForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
  console.log(userData);
});

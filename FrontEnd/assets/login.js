//page connexion

const emailUser = document.querySelector("#email");
const passwordUser = document.querySelector("#password");
const user = {
  email: emailUser,
  password: passwordUser,
};

async function logUser() {
  await fetch("http://localhost:5678/api/users/login"),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
}

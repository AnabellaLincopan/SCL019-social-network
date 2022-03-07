import { viewRegister } from "../views/register.js";
import { viewLogin } from "../views/login.js";

export const changeView = (hash) => {
  const container = document.getElementById("root");
  container.innerHTML = "";
  switch (hash) {
    case "":
    case "#":
    case "#/":
      container.appendChild(viewLogin());
      break;
    case "#/register":
      container.appendChild(viewRegister());
      break;
  }
};
// console.log("hola");
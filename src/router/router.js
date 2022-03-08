/* eslint-disable default-case */
/* eslint-disable import/no-cycle */
import { viewRegister } from "../views/register.js";
import { viewLogin } from "../views/login.js";

const changeView = (hash) => {
  const container = document.getElementById("root");
  // container.innerHTML = "";
  console.log(container);
  switch (hash) {
    case "":
    case "#":
    case "#/":
      container.innerHTML = "";
      container.appendChild(viewLogin());
      break;
    case "#/register":
      container.innerHTML = "";
      console.log(hash);
      container.appendChild(viewRegister());
      break;
  }
};
export const changeRouter = (hash) => {
  if (hash == "" || hash == "#" || hash == "#/"){
  return changeView(hash);
   }
  if (hash == "#/register"){
     return changeView(hash)
  }
};
// console.log("hola");

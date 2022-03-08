// Este es el punto de entrada de tu aplicacion

// import { myFunction } from "./views/register.js";

// myFunction();
import { changeRouter } from "./router/router.js";
import { viewLogin } from "./views/login.js";

// myFunction();

const init = () => {
  document.getElementById("root").appendChild(viewLogin());
  console.log("holaZuli");
  window.addEventListener("hashchange", () => {
    console.log("HolaAna");
    changeRouter(window.location.hash);
  });
};
window.addEventListener("load", init);

// export const root = document.getElementById("root");

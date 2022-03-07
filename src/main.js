// Este es el punto de entrada de tu aplicacion

// import { myFunction } from "./views/register.js";

// myFunction();
import { changeView } from "./router/router.js";

// myFunction();

const init = () => {
  changeView(window.location.hash);
  window.addEventListener("hashchange", (e) => {
    e.preventDefault();
    changeView(window.location.hash);
  });
};
window.addEventListener("load", init);

export const root = document.getElementById("root");

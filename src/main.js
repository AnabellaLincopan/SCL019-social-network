import { changeView } from "./router/router.js";
import { viewLogin } from "./views/login.js";

const init = () => {
  document.getElementById("root").appendChild(viewLogin());
  window.addEventListener("hashchange", () => {
    changeView(window.location.hash);
  });
};
window.addEventListener("load", init);

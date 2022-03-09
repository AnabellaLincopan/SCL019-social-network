/* eslint-disable default-case */
/* eslint-disable import/no-cycle */
import { viewRegister } from "../views/register.js";
import { viewLogin } from "../views/login.js";

export const changeView = (hash) => {
  const container = document.getElementById("root");
  // container.innerHTML = "";
  switch (hash) {
    case "":
    case "#":
    case "#/":
      container.innerHTML = "";
      container.appendChild(viewLogin());
      break;
    case "#/register":
      container.innerHTML = "";
      container.appendChild(viewRegister());
      break;
  }
};

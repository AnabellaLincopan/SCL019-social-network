import { loginWithGoogle } from "./firebase.js";
import { root } from "../main.js"

export const viewLogin = () => {
  // aqui va el DOM de nuestra pagina de Login
  //Creamos el padre de toda la seccion Login

  const loginContainer = document.createElement("div");
  loginContainer.className = "loginContainer";
  root.appendChild(loginContainer);

  // Creamos el contenedor de toda la seccion
  const infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";
  loginContainer.appendChild(infoContainer);

  // Ubicacion del Logo en la pagina

  const logoApp = document.createElement("div");
  logoApp.className = "logoApp";
  logoApp.textContent = "</>";
  infoContainer.appendChild(logoApp);

  // Ubicacion del texto LOGIN
  const loginText = document.createElement("div");
  loginText.className = "loginText";
  loginText.textContent = "LOGIN";

  infoContainer.appendChild(loginText);

  // Creacion de los campos de texto

  const userData = document.createElement("div");
  userData.className = "userData";
  userData.innerHTML = `
    <form id="formLogin" class="FormLogin">
    <div class="email"> User </div>
    <input type="email" id="emailLogin" class="emailLogin" placeholder= "name || nickName || email" autocomplete= "off" size ="25" required />
    <div class="password"> Password </div>
    <span class="iconEye"><i id="checkEye" class="fas fa-eye-slash"></i></span>
    <input type="password" id="passwordLogin" class="passwordLogin" placeholder= "Enter password" size ="25" required/>
    <input type="submit" id="submit-register" class="submit-register" value="Continue">
    </form>
    </div>
    `;

  infoContainer.appendChild(userData);
  // console.log('Hola mundo!');

  // Mostrar y ocultar contraseña
  const iconEye = userData.querySelector(".iconEye");
  const checkEye = userData.querySelector("#checkEye");
  const passwordLogin = userData.querySelector("#passwordLogin");

  iconEye.addEventListener("click", () => {
    if (passwordLogin.type === "password") {
      passwordLogin.type = "text";
      checkEye.classList.remove("fa-eye-slash");
      checkEye.classList.add("fa-eye");
    } else {
      passwordLogin.type = "password";
      checkEye.classList.add("fa-eye-slash");
      checkEye.classList.remove("fa-eye");
    }
  });

  // Botón de google

  const footerRegister = document.createElement("div");
  footerRegister.className = "footerRegister";
  infoContainer.appendChild(footerRegister);
  const buttonGoogle = document.createElement("div");
  buttonGoogle.className = "btnGoogle";

  buttonGoogle.innerHTML = `
  <input type="button" id="buttonGoogle" class="buttonGoogle" value="Sign In with Google">
  `;
  footerRegister.appendChild(buttonGoogle);
  buttonGoogle.addEventListener("click", loginWithGoogle);


  const rabbit = document.createElement("img");
  rabbit.className = "rabbit-img"
  rabbit.setAttribute("src", "./assets/white-rabbit.png");
  footerRegister.appendChild(rabbit);


  // Seccion link to Register
  const sectionReturn = document.createElement("div");
  sectionReturn.className = "sectionReturn";
  footerRegister.appendChild(sectionReturn);

  const returnLogin = document.createElement("div");
  returnLogin.className = "returnLogin";
  returnLogin.textContent = "If you don’t have an account ";
  sectionReturn.appendChild(returnLogin);

  const link = document.createElement("a");
  link.className = "linkReturnLogin";
  link.textContent = "Register Here";
  sectionReturn.appendChild(link);

  link.addEventListener("click", () => {
    link.href = "#/register";
  });

 
 
  
  return sectionReturn;
  
};

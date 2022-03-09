/* eslint-disable import/no-cycle */
import { loginWithGoogle } from "./firebase.js";
// import { root } from "../main.js";

export const viewLogin = () => {
  // aqui va el DOM de nuestra pagina de Login
  // Creamos el padre de toda la seccion Login

  const loginContainer = document.createElement("div");
  loginContainer.className = "loginContainer";
  // Creamos el contenedor de toda la seccion
  const loginInfoContainer = document.createElement("div");
  loginInfoContainer.className = "loginInfoContainer";
  loginContainer.appendChild(loginInfoContainer);

  // Ubicacion del Logo en la pagina

  const loginLogoApp = document.createElement("div");
  loginLogoApp.className = "loginLogoApp";
  loginLogoApp.textContent = "</>";
  loginInfoContainer.appendChild(loginLogoApp);

  // Ubicacion del texto LOGIN
  const loginLoginText = document.createElement("div");
  loginLoginText.className = "loginLoginText";
  loginLoginText.textContent = "LOGIN";

  loginInfoContainer.appendChild(loginLoginText);

  // Creacion de los campos de texto

  const loginUserData = document.createElement("div");
  loginUserData.className = "loginUserData";
  loginUserData.innerHTML = `
    <form id="loginFormLogin" class="loginFormLogin">
    <div class="loginUser"> User </div>
    <input type="text" id="loginEmailUser" class="loginEmailUser" placeholder= "name || nickName || email" autocomplete= "off" size ="25" required />
    <div class="loginPassword"> Password </div>
    <span class="iconEye"><i id="checkEye" class="fas fa-eye-slash"></i></span>
    <input type="password" id="loginPasswordInput" class="loginPasswordInput" placeholder= "Enter password" size ="25" required/>
    </form>
    </div>
    `;

  loginInfoContainer.appendChild(loginUserData);
  // console.log('Hola mundo!');

  // Mostrar y ocultar contraseña
  const iconEye = loginUserData.querySelector(".iconEye");
  const checkEye = loginUserData.querySelector("#checkEye");
  const loginPasswordInput = loginUserData.querySelector("#loginPasswordInput");

  iconEye.addEventListener("click", () => {
    if (loginPasswordInput.type === "password") {
      loginPasswordInput.type = "text";
      checkEye.classList.remove("fa-eye-slash");
      checkEye.classList.add("fa-eye");
    } else {
      loginPasswordInput.type = "password";
      checkEye.classList.add("fa-eye-slash");
      checkEye.classList.remove("fa-eye");
    }
  });

  // Boton Continuar

  const btnContinue = document.createElement("div");
  btnContinue.className = "login-btnContinue-place";
  btnContinue.innerHTML = `
   <input type="button" id="buttonContinue" class="login-btnContinue" value="Continue">
   `;
  loginUserData.appendChild(btnContinue);
  // btnContinue.addEventListener("click", () => {
  //   //  e.preventDefault();
  //   const loginUserName = document.getElementById("registerNameLogin").value;
  //   const email = document.getElementById("emailLogin").value;
  //   const password = document.getElementById("loginPasswordInput").value;
  //   registerUser(userName, email, password);
  //   // // // console.log(registerUser);
  // });

  // Botón de google

  const buttonGoogle = document.createElement("div");
  buttonGoogle.className = "btnGoogle";
  buttonGoogle.innerHTML = `
  <input type="button" id="buttonGoogle" class="buttonGoogle" value="Sign In with Google">
  `;
  loginUserData.appendChild(buttonGoogle);
  buttonGoogle.addEventListener("click", loginWithGoogle);

  // Creacion LoginFooter

  const loginFooter = document.createElement("div");
  loginFooter.className = "loginFooter";
  loginInfoContainer.appendChild(loginFooter);

  // Agregamos imagen para version responsive
  const rabbit = document.createElement("img");
  rabbit.className = "loginRabbit-img";
  rabbit.setAttribute("src", "./assets/white-rabbit.png");
  loginFooter.appendChild(rabbit);
  // Seccion link to Register
  const sectionReturn = document.createElement("div");
  sectionReturn.className = "sectionReturn";
  loginFooter.appendChild(sectionReturn);

  const returnRegister = document.createElement("div");
  returnRegister.className = "returnRegister";
  returnRegister.textContent = "If you don’t have an account ";
  sectionReturn.appendChild(returnRegister);

  const link = document.createElement("a");
  link.className = "linkReturnRegister";
  link.textContent = "Register Here";
  sectionReturn.appendChild(link);

  link.addEventListener("click", () => {
    window.location.href = "#/register";
    console.log("Hola");
  });
  return loginContainer;
};

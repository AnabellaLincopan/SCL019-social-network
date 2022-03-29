/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-duplicates
import { loginWithGoogle } from "./firebase.js";
import { loginUser } from "./firebase.js";
// import { root } from "../main.js";

export const viewLogin = () => {
  // Creamos el padre de toda la seccion Login

  const loginContainer = document.createElement("div");
  loginContainer.className = "loginContainer";
  // Creamos el contenedor de toda la seccion
  const loginInfoContainer = document.createElement("div");
  loginInfoContainer.className = "loginInfoContainer";
  loginContainer.appendChild(loginInfoContainer);

  // Ubicacion del Logo en la pagina

  const loginLogoApp = document.createElement("img");
  loginLogoApp.className = "loginLogoApp";
  loginLogoApp.setAttribute("src", "./assets/Logo_codeZan.png");
  loginInfoContainer.appendChild(loginLogoApp);
  // Ubicacion del texto LOGIN
  const loginLoginText = document.createElement("div");
  loginLoginText.className = "loginLoginText";
  // loginLoginText.textContent = "LOGIN";

  const welcomeText = document.createElement("div");
  welcomeText.className = "welcomeText";
  welcomeText.innerHTML = ` 
  <p> Hi, User.<br> Welcome to our new socialNetwork.<br><br> Join us && share: <br> -Ideas<br> -Exp <br> -PC builds & more. <br><br> 
  Come.. Follow the white rabbit.. <p/>
  `;
  loginInfoContainer.appendChild(loginLoginText);
  loginLoginText.appendChild(welcomeText);

  // Creacion de los campos de texto

  const loginUserData = document.createElement("div");
  loginUserData.className = "loginUserData";
  loginUserData.innerHTML = `
    <form id="loginFormLogin" class="loginFormLogin">
    <div class="loginUser"> User </div>
    <input type="text" id="loginEmailUser" class="loginEmailUser" placeholder= "Enter email" autocomplete= "on" size ="25" required />
    <span class="displayNone"><p id="emailLoginEnter" class="emailLoginEnter"> Enter a valid e-mail </p></span>
    <span class="displayNone"><p id="userNotFound" class="userNotFound"> User not found </p></span>
    <div class="loginPassword"> Password </div>
    <span class="login-iconEye"><i id="checkEye" class="fas fa-eye-slash"></i></span>
    <input type="password" id="loginPasswordInput" class="loginPasswordInput" placeholder= "Enter password" size ="25" required/>
    <span class="displayNone"><p id="wrongPassword" class="wrongPassword"> Wrong password </p></span>
    <span class="displayNone"><p id="enterPasswordPassword" class="enterPassword"> Enter password </p></span>
    </form>
    </div>
    `;

  loginInfoContainer.appendChild(loginUserData);

  // Mostrar y ocultar contraseña
  const iconEye = loginUserData.querySelector(".login-iconEye");
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
   <input type="button" id="buttonContinue" class="login-btnContinue" value="CONTINUE">
   `;
  loginUserData.appendChild(btnContinue);
  btnContinue.addEventListener("click", () => {
    const email = document.getElementById("loginEmailUser").value;
    if (email === "") {
      document.querySelector(".emailLoginEnter").style.display = "block";
    } else {
      document.querySelector(".emailLoginEnter").style.display = "none";
    }
    const password = document.getElementById("loginPasswordInput").value;
    if (password === "") {
      document.querySelector(".enterPassword").style.display = "block";
    } else {
      document.querySelector(".enterPassword").style.display = "none";
    }
    loginUser(email, password);
  });

  // Botón de google
  const buttonGoogle = document.createElement("div");
  buttonGoogle.className = "btnGoogle";
  buttonGoogle.innerHTML = `
  <input type="button" id="buttonGoogle" class="buttonGoogle" value="Sign In with Google">
  `;
  loginUserData.appendChild(buttonGoogle);
  buttonGoogle.addEventListener("click", loginWithGoogle);

  // Boton de Register

  const btnRegister = document.createElement("div");
  btnRegister.className = "btnRegister";
  btnRegister.innerHTML = `
  <input type="button" id="btnRegister" class="login-btnRegister" value=" REGISTER">
  `;
  loginUserData.appendChild(btnRegister);

  btnRegister.addEventListener("click", () => {
    window.location.hash = "#/register";
  });

  // Creacion LoginFooter

  const loginFooter = document.createElement("div");
  loginFooter.className = "loginFooter";
  loginInfoContainer.appendChild(loginFooter);

  // Seccion link to Register
  const sectionReturn = document.createElement("div");
  sectionReturn.className = "sectionReturn";
  loginFooter.appendChild(sectionReturn);

  const returnRegister = document.createElement("div");
  returnRegister.className = "returnRegister";
  returnRegister.textContent = "Nevenka Veliz  Anabella Lincopan  Zulibeth Torres";
  sectionReturn.appendChild(returnRegister);

  return loginContainer;
};

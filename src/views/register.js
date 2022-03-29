/* eslint-disable func-names */
// eslint-disable-next-line import/no-cycle
import { registerUser } from "./firebase.js";
// eslint-disable-next-line import/no-cycle

export const viewRegister = () => {
  // aqui va el DOM de nuestra pagina de registro
  // Creamos el padre de toda la seccion Register

  const registerContainer = document.createElement("div");
  registerContainer.className = "registerContainer";

  // Creamos el contenedor de toda la seccion
  const infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";
  registerContainer.appendChild(infoContainer);

  // Ubicacion de elementos del header

  const headerLogin = document.createElement("div");
  headerLogin.className = "headerLogin";
  infoContainer.appendChild(headerLogin);

  // Creacion de elementos del header

  const logoApp = document.createElement("div");
  logoApp.className = "logoApp";
  logoApp.textContent = "</>";
  headerLogin.appendChild(logoApp);

  // Ubicacion del texto REGISTER
  const registerText = document.createElement("div");
  registerText.className = "registerText";
  registerText.textContent = "REGISTER";

  headerLogin.appendChild(registerText);

  // Creacion de los campos de texto
  const userData = document.createElement("div");
  userData.className = "userData";
  userData.innerHTML = `
  <form id="formLogin" class="FormLogin">
  <div class="name"> Name </div>
  <input type="text" id="registerNameLogin" class="registerNameLogin" placeholder= "Enter your name" autocomplete= "off" size ="25"/>
  <span class="displayNone"><p id="nameEnter" class="enterName"> Enter name </p></span>
  <div class="nickName"> Nickname </div>
  <input type="text" id="nickNameLogin" class="nickNameLogin" placeholder= "Enter your nickname" autocomplete= "off" size ="25"/>
  <div class="email"> E-mail </div>
  <input type="email" id="emailLogin" class="emailLogin" placeholder= "Enter e-mail" autocomplete= "off" size ="25" required/>
  <span class="displayNone"><p id="emailRequired" class="emailRequired"> Enter a valid e-mail </p></span>
  <span class="displayNone"><p id="emailInUse" class="emailInUseInvalid"> Error: email-already in use </p></span>
  <div class="password"> Password </div>
  <span class="iconEye"><i id="checkEye" class="fas fa-eye-slash"></i></span>
  <input type="password" id="passwordLogin" class="passwordLogin" placeholder= "Enter password" minlength="6" maxlength="8" size ="25"/>
  <span class="displayNone"><p id="passwordRequiredText"> Minimum 6 characters </p></span>
  <span class="displayNone"><p id="passwordNoneText" class="nonePassword"> Enter password </p></span>
  </form>
  </div>
  `;

  infoContainer.appendChild(userData);

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

  // Agregamos una funcion para mostrar un mensaje de advertencia en el password
  passwordLogin.onkeyup = function () {
    document.getElementById("passwordRequiredText").style.display = "block";
  };
  // boton de continuar
  const buttonContinue = document.createElement("div");
  buttonContinue.className = "buttonContinue-place";
  buttonContinue.innerHTML = `
   <input type="button" id="buttonContinue" class="buttonContinue" value="Continue">
   `;
  userData.appendChild(buttonContinue);
  buttonContinue.addEventListener("click", () => {
    //  e.preventDefault();
    const userName = document.getElementById("registerNameLogin").value;
    if (userName === "") {
      document.querySelector(".enterName").style.display = "block";
    } else {
      document.querySelector(".enterName").style.display = "none";
    }

    const email = document.getElementById("emailLogin").value;
    if (email === "") {
      document.querySelector(".emailRequired").style.display = "block";
    } else {
      document.querySelector(".emailRequired").style.display = "none";
    }

    const password = document.getElementById("passwordLogin").value;
    if (password === "") {
      document.querySelector(".nonePassword").style.display = "block";
    } else {
      document.querySelector(".nonePassword").style.display = "none";
    }
    registerUser(userName, email, password);
  });

  // SECCION FINAL DEL REGISTRO

  const footerRegister = document.createElement("div");
  footerRegister.className = "footerRegister";
  infoContainer.appendChild(footerRegister);

  // Seccion
  const sectionReturn = document.createElement("div");
  sectionReturn.className = "sectionReturn";
  footerRegister.appendChild(sectionReturn);

  const returnLogin = document.createElement("div");
  returnLogin.className = "returnLogin";
  returnLogin.textContent = "Do you already have an account?. ";

  const link = document.createElement("a");
  link.className = "linkReturnLogin";
  link.textContent = "Sign In";

  link.addEventListener("click", () => {
    window.location.hash = "#";
  });

  sectionReturn.appendChild(returnLogin);
  sectionReturn.appendChild(link);
  return registerContainer;
};

export const validateEmailRequire = document.querySelector(".emailRequired");
export const validateEmailInUse = document.querySelector(".emailInUseInvalid");


import { loginWithGoogle, registerUser } from "./firebase.js";


// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui va el DOM de nuestra pagina de registro
  // Creamos el contenedor de toda la seccion
  const infoContainer = document.createElement("div");
  infoContainer.className = "infoContainer";
  document.getElementById("root").appendChild(infoContainer);

  // Ubicacion del Logo en la pagina

  const logoApp = document.createElement("div");
  logoApp.className = "logoApp";
  logoApp.textContent = "</>";
  infoContainer.appendChild(logoApp);

  // Ubicacion del texto REGISTER
  const registerText = document.createElement("div");
  registerText.className = "registerText";
  registerText.textContent = "REGISTER";
  
  infoContainer.appendChild(registerText);

  // Creacion de los campos de texto

  const userData = document.createElement("div");
  userData.className = "userData";
  userData.innerHTML = `
  <form id="formLogin" class="FormLogin">
  <div class="name"> Name </div>
  <input type="text" id="registerNameLogin" class="registerNameLogin" placeholder= "Enter your name" autocomplete= "off" required/>
  <div class="nickName"> Nickname </div>
  <input type="text" id="nickNameLogin" class="nickNameLogin" placeholder= "Enter your nickname" autocomplete= "off"/>
  <div class="email"> E-mail </div>
  <input type="email" id="emailLogin" class="emailLogin" placeholder= "Enter e-mail" autocomplete= "off" required />
  <div class="password"> Password </div>
  <span class="iconEye"><i id="checkEye" class="fas fa-eye-slash"></i></span>
  <input type="password" id="passwordLogin" class="passwordLogin" placeholder= "Enter password" required/>
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


  // boton de continuar
  // const buttonContinue = document.createElement("div");
  // buttonContinue.className = "buttonContinue";
  // buttonContinue.innerHTML = `
  // <input type="button" id="buttonContinue" class="buttonContinue" value="Continue">
  // `;

  // infoContainer.appendChild(buttonContinue);

  // prueba boton de registro

  const buttonContinue = document.getElementById('submit-register');
  buttonContinue.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.getElementById('registerNameLogin').value;
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    registerUser(userName, email, password);
    console.log(registerUser);
  });
  // // console.log(buttonContinue)
  // SECCION FINAL DEL REGISTRO


  const footerRegister = document.createElement("div");
  footerRegister.className = "footerRegister";
  infoContainer.appendChild(footerRegister);

  // botón de google
  const buttonGoogle = document.createElement("div");
  buttonGoogle.className = "btnGoogle";

  buttonGoogle.innerHTML = `
  <input type="button" id="buttonGoogle" class="buttonGoogle" value="Sign In with Google">
  `;

  footerRegister.appendChild(buttonGoogle);
  buttonGoogle.addEventListener("click", loginWithGoogle);

  // Link para redireccionar a Login

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

  link.addEventListener("click", function () {
    
    link.href = "#";

  });

  returnLogin + link;

  sectionReturn.appendChild(returnLogin);
  sectionReturn.appendChild(link);
};

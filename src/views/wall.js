// eslint-disable-next-line no-unused-vars
// import { logOut } from "./firebase.js";
import { saveTask, getTasks } from "./firebase.js";

// const pruebaContainer = document.createElement("div");

// window.addEventListener("DOMContentLoaded", async () => {
//   // console.log("works");
//   const querySnapshot = await getTasks;
//   // console.log(querySnapshot);
//   let html = "";
//   querySnapshot.forEach((doc) => {
//     // console.log(doc.data());
   
//     const task = doc.data();
//     html += `
//      <div>
//      <h3> User </h3>
//      <p>${task.description}</p>
//      </div>
//     `;
//   });

//  pruebaContainer.innerHTML = html;
// });

export const viewWall = () => {
  const wallContainer = document.createElement("div");
  wallContainer.className = "wall";

  // Aqui creamos el contenedor de toda la informacion en el muro

  const infoWallContainer = document.createElement("div");
  infoWallContainer.className = "infoWallContainer";
  wallContainer.appendChild(infoWallContainer);

  // Creacion de seccion header
  const wallHeader = document.createElement("div");
  wallHeader.className = "wallHeader";
  infoWallContainer.appendChild(wallHeader);

  // Creacion de boton Log Out
  const btnLogout = document.createElement("div");
  btnLogout.className = "btnLogout";
  btnLogout.innerHTML = `
  <input type="button" id="btnLogout" class="btn-logout" value="LOG OUT">
  `;
  wallHeader.appendChild(btnLogout);

  btnLogout.addEventListener("click", () => {
    window.location.hash = "#/";
  });

  // Creacion de Nombre de usuario en pantalla
  const idUserText = document.createElement("div");
  idUserText.className = "idUserText";
  wallHeader.appendChild(idUserText);
  idUserText.textContent = " Hello, User ";

  // Creacion de Seccion de Post
  const postSection = document.createElement("div");
  postSection.className = "postSection";
  infoWallContainer.appendChild(postSection);

  // Creacion del text area
  const wallPostData = document.createElement("div");
  wallPostData.className = "wallPostData";
  wallPostData.innerHTML = `
 <label for="description">Description:</label>
 <input type="text" id="task-description" rows="3" class="makePost" placeholder="Task Description"></input>
 <span class="errorPost"></span>
 <span class="wall-off"><i class="fa fa-power-off"></i></span>
 <span class="post-remove"><i class="fa fa-trash"></i></span>
 <span class="post-like"><i class="fa fa-thumbs-up"></i></span>
 `;

  // infoWallContainer.appendChild(wallPostData);
  postSection.appendChild(wallPostData);

  // Creamos boton de Post
  const btnPost = document.createElement("div");
  btnPost.className = "btnPost";
  btnPost.innerHTML = `
   <input type="button" id="btnPost" value="Post">
   `;
  postSection.appendChild(btnPost);

  // Creamos una funcion para Guardar la informacion, y verificar que el campo este lleno
  const description = wallContainer.querySelector("#task-description");
  const errorPost = wallContainer.querySelector(".errorPost");

  btnPost.addEventListener("click", () => {
    if (description.value === "") {
      // console.log("funciona");
      errorPost.innerHTML = "Error: Debe ingresar un texto";
    } else {
      const textPost = wallContainer.querySelector(".makePost").value;
      // console.log(textPost);
      saveTask(textPost);
      document.getElementById("task-description").value = "";
      // console.log("logrado");
    }
  });

  const createPost = document.createElement("div");
  createPost.className = "createPost";
  infoWallContainer.appendChild(createPost);

  // neveFunction() {
  //   window.addEventListener("DOMContentLoaded", async () => {
  //   // console.log("works");
  //   const querySnapshot = await getTasks();
  //   console.log(querySnapshot);
  //   let html = "";
  //   querySnapshot.forEach((doc) => {
  //    console.log(doc.data());

  //     const task = doc.data();
  //     html += `
  //      <div>
  //      <h3> User </h3>
  //      <p>${task.description}</p>
  //      </div>
  //     `;
  //    });

  //    createPost.innerHTML = html;
  //  });
  // }

  return wallContainer;
};

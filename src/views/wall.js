// eslint-disable-next-line no-unused-vars
// import { logOut } from "./firebase.js";
import {
  saveTask,
  onGetTasks,
  deleteTask,
  // getTaskEdit,
  // updateTask,
  auth,
  likePost,
} from "./firebase.js";
import { onSnapshot } from "./firebase-init.js";

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
  <button class="btnLogout-In" ><i class="fa fa-power-off fa-2x"></i></button>

  `;
  wallHeader.appendChild(btnLogout);

  btnLogout.addEventListener("click", () => {
    window.location.hash = "#/";
  });

  // Creacion de Nombre de usuario en pantalla
  const idUserText = document.createElement("h1");
  idUserText.className = "idUserText";
  wallHeader.appendChild(idUserText);
  idUserText.textContent = " Hello & Welcome ";

  // Creacion de Seccion de Post
  const postSection = document.createElement("div");
  postSection.className = "postSection";
  infoWallContainer.appendChild(postSection);

  // Creacion del text area
  const wallPostData = document.createElement("div");
  wallPostData.className = "wallPostData";
  wallPostData.innerHTML = `
 <textarea id="task-description" rows="5" cols="40" class="makePost" placeholder="Write something..."></textarea>
 <span class="errorPost"></span>
 
 `;

  postSection.appendChild(wallPostData);

  // Creamos boton de Post
  const btnPost = document.createElement("div");
  btnPost.className = "btnPost";
  btnPost.innerHTML = `
   <input type="button" id="btnPost-edit" value="Post">
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

  const newPost = async () => {
    // console.log("works");
    onSnapshot(onGetTasks, (querySnapshot) => {
      let postContainer = "";

      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
      // console.log(doc.data());

        const task = doc.data();
        const userNameId = doc.data();
        postContainer += `
        <div class="newUserPost">
      
        <div class ="section-btn-edit-post">
        <span><button class="editPost-btn" value="${doc.id}">Edit</button></span>
        <button class="post-remove" value="${doc.id}"><i class="fa fa-trash"></i></button>
        </div>
        <div class="textUserOnPost"<h3>${userNameId.name}</h3></div>
        <div class="textDescriptionPost"><textarea id="textDescriptionPost" rows="5" readonly>${task.description}</textarea></div>
        </div>
        <div class="section-likes">
        <button class="btn-Likes" value="${doc.id}"><i class="fa fa-thumbs-up"></i></button>
        <input class="counter" type="number" value="${task.likesCounter}" size="1"  name="" readonly></input>
        <button class="btn-save-postEdit" style="display:none">Save</button>
        </div>
       `;

        // console.log(postContainer);
      });
      createPost.innerHTML = postContainer;
      const deleteBtns = createPost.querySelectorAll(".post-remove");

      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (confirm("Confirm Delete Post") === true) {
            deleteTask(btn.value);
          // console.log(btn.value);
          }
        });
      });

      // const editBtns = createPost.querySelectorAll(".editPost-btn");

      // editBtns.forEach(btn => {
      //   btn.addEventListener("click", async () => {
      //     const doc = await getTaskEdit(btn.value);
      //     const editTextArea = createPost.querySelector("#textDescriptionPost");
      //     editTextArea.removeAttribute("readonly");

      //     const saveEditPost = createPost.querySelector(".btn-save-postEdit");
      //     saveEditPost.style.display = "block";
      //     saveEditPost.addEventListener("click", () => {
      //       const newDescription = editTextArea.value;
      //       console.log(newDescription);
      //       updateTask.apply(btn.value, newDescription());
      //       saveEditPost.style.display = "none";
      //       editTextArea.setAttribute("readonly");
      //     });
      // saveEditPost.className = "saveEditPost";
      // saveEditPost.innerHTML = `
      // <button class="btn-save-postEdit" value="Save"></button>`;

      // console.log(doc.data());
      // });
      // });
      // LIKES & Like Counter
      const likeBtn = createPost.querySelectorAll(".btn-Likes");
      likeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const userId = auth.currentUser.uid;
          likePost(btn.value, userId);
        });
      });
    });
  };

  const wallPost = newPost();
  // wallPost.createElement("div");
  console.log(wallPost);

  return wallContainer;
};

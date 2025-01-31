// eslint-disable-next-line no-unused-vars
import {
  saveTask,
  onGetTasks,
  deleteTask,
  getTaskEdit,
  updateTask,
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
  idUserText.textContent = " Welcome ";

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
      errorPost.innerHTML = "Please enter text";
    } else {
      const textPost = wallContainer.querySelector(".makePost").value;
      saveTask(textPost);
      document.getElementById("task-description").value = "";
    }
  });

  const createPost = document.createElement("div");
  createPost.className = "createPost";
  infoWallContainer.appendChild(createPost);

  const newPost = async () => {
    onSnapshot(onGetTasks, (querySnapshot) => {
      let postContainer = "";
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        const userNameId = doc.data();

        if (task.userId === auth.currentUser.uid) {
          postContainer += `
          <div class="newUserPost">
          <div class ="section-btn-edit-post">
          <span><button class="editPost-btn" value="${doc.id}">Edit</button></span>
          <button class="post-remove" value="${doc.id}"><i class="fa fa-trash"></i></button>
          </div>
          <div class="textUserOnPost-Edit"<h3>${userNameId.name}</h3></div>
          <div class="textDescriptionPost"><textarea id="textDescriptionPost-${doc.id}" class="userPostText" rows="5" readonly>${task.description}</textarea></div>
          </div>
          <div class="section-likes">
          <button class="btn-Likes" value="${doc.id}"><i class="fa fa-thumbs-up"></i></button>
          <input class="counter" type="number" value="${task.likesCounter}" size="1"  name="" readonly></input>
          <button id="btnSaveEditPost" class="btn-save-postEdit-${doc.id}" style="display:none">Save</button>
          </div>
        `;
        } else {
          postContainer += `
          <div class="newUserPost">
          <div class="textUserOnPost"<h3>${userNameId.name}</h3></div>
          <div class="textDescriptionPost"><textarea id="textDescriptionPost-${doc.id}" rows="5" class="userPostText"  readonly>${task.description}</textarea></div>
          </div>
          <div class="section-likes">
          <button class="btn-Likes" value="${doc.id}"><i class="fa fa-thumbs-up"></i></button>
          <input class="counter" type="number" value="${task.likesCounter}" size="1"  name="" readonly></input>
          </div>
          `;
        }
        createPost.innerHTML = postContainer;
      });
      const deleteBtns = createPost.querySelectorAll(".post-remove");

      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // eslint-disable-next-line no-restricted-globals
          if (confirm("Confirm Delete Post") === true) {
            deleteTask(btn.value);
          }
        });
      });

      const editBtns = createPost.querySelectorAll(".editPost-btn");
      editBtns.forEach((btn) => {
        btn.addEventListener("click", async () => {
          // eslint-disable-next-line no-unused-vars
          const doc = await getTaskEdit(btn.value);
          const editTextArea = createPost.querySelector(`#textDescriptionPost-${doc.id}`);
          editTextArea.removeAttribute("readonly");

          const saveEditPost = createPost.querySelector(`.btn-save-postEdit-${doc.id}`);
          saveEditPost.style.display = "block";
          saveEditPost.addEventListener("click", () => {
            const newDescription = editTextArea.value;
            updateTask(btn.value, newDescription);
            saveEditPost.style.display = "none";
            editTextArea.setAttribute("readonly", true);
          });
        });
      });
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

  newPost();

  return wallContainer;
};

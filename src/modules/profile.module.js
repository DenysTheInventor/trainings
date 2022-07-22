import { Auth } from "./auth.module";
import { Modal } from "./modal.module";
import { Database } from "./db.module";

export class Profile {
  static getProfile() {
    isLoading();
    Modal.service(true, "profile is loading...", 1000);
    setTimeout(() => {
      isLoading();
      renderProfile();
    }, 1000);
  }

  static updateProfile() {
    const profileForm = document.getElementById("user-form");

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userName = `${document
        .getElementById("user-name")
        .value.trim()} ${document.getElementById("user-surname").value.trim()}`;

      const updatedUser = {
        displayName: userName,
        email: document.getElementById("user-mail").value,
        photoURL: document.getElementById("user-avatar").value,
        dateOfBirth: document.getElementById("user-birthdate").value,
        phone: document.getElementById("user-phone").value,
        notes: document.getElementById("user-notes").value,
        diplomas: document.getElementById("user-diplomas").value,
        screens: document.getElementById("user-screens").value,
      };

      Auth.updateUser(updatedUser);
      Database.createBDrecord(updatedUser, "users");
    });
  }
}

function isLoading() {
  const contentArea = document.getElementById("content");

  if (contentArea.style.display == "none") {
    contentArea.style.display = "block";
  } else {
    contentArea.style.display = "none";
  }
}

function renderProfile() {
  const user = Auth.getUser();
  const fullName = user.displayName.split(" ");
  const name = fullName[0];
  const surname = fullName[1];
  const mail = user.email;
  const avatar = user.photoURL;

  document.getElementById("user-name").value = name;
  document.getElementById("user-surname").value = surname;
  document.getElementById("user-mail").value = mail;
  document.getElementById("user-avatar").value = avatar;

  document.querySelector(".user-profile__photo").src = avatar;
}

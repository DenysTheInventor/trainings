import "./style.css";
import { Auth } from "./modules/auth.module";
import { Profile } from "./modules/profile.module";

const signOutBTN = document.getElementById("sign-out");
const getUserBTN = document.getElementById("get-user");

window.addEventListener("load", Profile.updateProfile);
window.addEventListener("load", Profile.getProfile);

getUserBTN.addEventListener("click", () => {
  console.log(Auth.getUser());
});

signOutBTN.addEventListener("click", (event) => {
  event.preventDefault();
  Auth.signout();
});

import "./style.css";
import { Auth } from "./modules/auth.module";

const signOutBTN = document.getElementById("sign-out");

signOutBTN.addEventListener("click", (event) => {
  event.preventDefault();
  Auth.signout();
});

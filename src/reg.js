import "./style.css";
import { Auth } from "./modules/auth.module";

const signinForm = document.getElementById("reg-form");
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signinForm.querySelector("#reg-form__mail").value.trim();
  const password = signinForm.querySelector("#reg-form__password").value.trim();

  Auth.signin(email, password);
});

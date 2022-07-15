import { Form } from "./modules/form.module";
import { Database } from "./modules/db.module";
import { Auth } from "./modules/auth.module";
import { addTaskIcon } from "./utils";
import "./style.css";

const addRowBTN = document.getElementById("add-btn");
const signOutBTN = document.getElementById("sign-out");
const tabsArea = document.querySelector(".control-tabs");

Auth.checkStatus();
window.addEventListener("load", Database.getDBrecords);
addRowBTN.addEventListener("click", Form.handleNewForm);
tabsArea.addEventListener("click", addTaskIcon);

signOutBTN.addEventListener("click", () => {
  Auth.signout();
});

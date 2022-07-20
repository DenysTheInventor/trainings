import { Form } from "./modules/form.module";
import { Database } from "./modules/db.module";
import { Auth } from "./modules/auth.module";
import { addControlIcons } from "./utils";
import "./style.css";
import { Control } from "./modules/control.module";

const addRowBTN = document.getElementById("add-btn");
const filterBTN = document.getElementById("filter-btn");
const signOutBTN = document.getElementById("sign-out");
const tabsArea = document.querySelector(".control-tabs");

Auth.checkStatus();
window.addEventListener("load", Database.getDBrecords);
addRowBTN.addEventListener("click", Form.handleNewForm);
filterBTN.addEventListener("click", Control.filterData);
tabsArea.addEventListener("click", addControlIcons);

signOutBTN.addEventListener("click", (event) => {
  event.preventDefault();
  Auth.signout();
});

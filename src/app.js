import { Form } from "./modules/form.module";
import { Database } from "./modules/db.module";
import { addTaskIcon } from "./utils";
import "./style.css";

const addRowBTN = document.getElementById("add-btn");
const tabsArea = document.querySelector(".control-tabs");

window.addEventListener("load", Database.getDBrecords);
addRowBTN.addEventListener("click", Form.handleNewForm);
tabsArea.addEventListener("click", addTaskIcon);

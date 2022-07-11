import { Modal } from "./modules/modal.module";
import { Form, getDBrecords } from "./modules/form.module";
import "./style.css";

const addRowBTN = document.getElementById("add-btn");

window.addEventListener("load", getDBrecords);
addRowBTN.addEventListener("click", Form.handleForm);

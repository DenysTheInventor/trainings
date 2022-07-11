import { Modal } from "./modules/modal.module";
import { Form } from "./modules/form.module";
import "./style.css";

const addRowBTN = document.getElementById("add-btn");
addRowBTN.addEventListener("click", showModal);

function showModal() {
  Modal.show("Record creation", Form.create());
}

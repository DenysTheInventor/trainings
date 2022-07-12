import { Modal } from "./modules/modal.module";
import { Form } from "./modules/form.module";
import { Database } from "./modules/db.module";
import { graph } from "./modules/chart.module";
import "./style.css";

const addRowBTN = document.getElementById("add-btn");
const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, graph);

window.addEventListener("load", Database.getDBrecords);
addRowBTN.addEventListener("click", Form.handleNewForm);

import { basicFormSettings } from "../settings";
import { setThemeView } from "../utils";
import { Modal } from "./modal.module";

export class Form {
  static handleForm() {
    Modal.show("Create new record:", setFormFrame(basicFormSettings));
    addFormListener();
  }
}

function addFormListener() {
  const recordForm = document.getElementById("record-form");
  recordForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newRecord = {
      group: document.getElementById("record-group").value,
      module: document.getElementById("record-module").value,
      theme: document.getElementById("record-theme").value,
      people: document.getElementById("record-people").value,
      time: document.getElementById("record-time").value,
      date: document.getElementById("record-date").value,
      link: document.getElementById("record-link").value,
      type: document.getElementById("record-type").value,
      notes: document.getElementById("record-notes").value.trim(),
    };

    createBDrecord(newRecord);
    Modal.cancel();
    getDBrecords();
  });
}

function setFormFrame(form) {
  return `
        <form class="mui-form" id="record-form">
        <div class="note-form__row">
            <div class="mui-textfield w-20">
                <input type="text" id="record-group" value="${form.group}" required>
                <label>Group</label>
            </div>
            <div class="mui-select w-20">
                <select id="record-module" value="${form.module}" required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">4</option>
                </select>
                <label>Module</label>
            </div>
            <div class="mui-select w-20">
                <select id="record-theme" value="${form.theme}" required>
                  <option value="1">Базові навички</option>
                  <option value="2">MS Office Excel</option>
                  <option value="3">MS Office Word</option>
                  <option value="4">MS Office PowerPoint</option>
                  <option value="5">Інтернет і електронна пошта</option>
                  <option value="6">Робота з Google-документами</option>
                  <option value="7">Безпека і захист даних</option>
                  <option value="8">Соціальні мережі і нові медіа</option>
                </select>
                <label>Theme</label>
            </div>
            <div class="mui-textfield w-20">
                <input type="text" id="record-people" value="${form.people}" required>
                <label>People</label>
            </div>
        </div>
        <div class="note-form__row">
            <div class="mui-textfield w-50">
                <input type="time" id="record-time" value="${form.time}" required>
                <label>Time</label>
            </div>
            <div class="mui-textfield w-50">
                <input type="date" id="record-date" value="${form.date}" required>
                <label>Date</label>
            </div>
        </div>
        <div class="note-form__row">
            <div class="mui-textfield w-50">
                <input type="link" id="record-link" value="${form.link}" required>
                <label>Teams link</label>
            </div>
            <div class="mui-select w-50">
                <select id="record-type" value="${form.type}" required>
                  <option value="1">Online</option>
                  <option value="2">Offline</option>
                </select>
                <label>Module type</label>
            </div>
        </div>
        <div class="mui-textfield">
          <textarea placeholder="Textarea" id="record-notes" value="${form.notes}">
          </textarea>
          <label>Notes</label>
        </div>
        <button type="submit" class="mui-btn mui-btn--raised">Save record</button>
        </form>
        `;
}

function createBDrecord(record) {
  return fetch(
    "https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records.json",
    {
      method: "POST",
      body: JSON.stringify(record),
      header: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      record.id = response.name;
      console.log(record);
    });
}

export function getDBrecords() {
  fetch(
    `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records.json`
  )
    .then((response) => response.json())
    .then((records) => {
      console.log(records);
      renderList(records);
    });
}

function renderList(records) {
  const table = document.querySelector("#records-table tbody");
  table.innerHTML = "";

  for (const key in records) {
    table.innerHTML += renderRecord(records[key], key);
  }

  const deleteBTNS = document.querySelectorAll(".row-delete a");
  deleteBTNS.forEach((btn) => {
    btn.addEventListener("click", deleteRecord);
  });
}

function renderRecord(record, id) {
  const theme = setThemeView(record.theme);
  return `
  <tr class="row mui-panel" data-id="${id}">
  <td class="row-icon ${theme.color}">
      ${theme.icon}
  </td>
  <td class="row-type">${theme.name}</td>
  <td class="row-date">${record.date}</td>
  <td class="row-time">${record.time}</td>
  <td class="row-teacher">Denis Dmitriev</td>
  <td class="row-theme">${record.theme}</td>
  <td class="row-group">${record.group}</td>
  <td class="row-module">${record.module}</td>
  <td class="row-people">
    ${record.people}
  </td>
  <td class="row-sort">
      <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <ul class="mui-dropdown__menu">
          <li><a href="#">Update</a></li>
          <li class="row-delete"><a href="#">Delete</a></li>
        </ul>
  </td>
    </tr>  
    `;
}

function deleteRecord(e) {
  e.preventDefault();
  const { target } = e;
  const record = target.closest(".row");
  const recordId = target.dataset.id;

  record.remove();
}

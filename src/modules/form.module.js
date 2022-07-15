import { basicFormSettings } from "../settings";
import { setRecordTime, setThemeView } from "../utils";
import { Modal } from "./modal.module";
import { Database } from "./db.module";
import { Auth } from "./auth.module";
import { createGraph } from "./chart.module";
import { lessons } from "../settings";

export class Form {
  static renderList(records) {
    const table = document.querySelector("#records-table tbody");
    table.innerHTML = "data is loading...";
    setTimeout(() => {
      table.innerHTML = "";
      Database.filterData(records);
      for (const key in records) {
        table.innerHTML += renderRecord(records[key], key);
      }

      const info = allLessonsCountArray(records);

      addControlEvents();
      drawGraph(info);
    }, 1000);
  }

  static handleNewForm() {
    Modal.show("Create new record:", setFormFrame(basicFormSettings));
    addFormListener(false);
  }

  static handleUpdateForm(formToChange, id) {
    Modal.show("Change record:", setFormFrame(formToChange));
    addFormListener(true, id);
  }
}

function allLessonsCountArray(records) {
  const allObjLessons = [];
  const allLessons = [...lessons];

  for (const key in records) {
    allObjLessons.push(records[key]);
  }

  allObjLessons.forEach((lesson) => {
    const index = allLessons.findIndex((item) => item.theme == lesson.theme);
    allLessons[index].count += 1;
    allLessons[index].people += Number(lesson.people);
    allLessons[index].salary += Number(lesson.salary);
  });

  return {
    personLessons: allLessons.map((lesson) => lesson.count),
    personPeople: allLessons.map((lesson) => lesson.people),
    personSalary: allLessons.map((lesson) => lesson.salary),
  };
}

function drawGraph(info) {
  const { personLessons, personPeople, personSalary } = info;
  const lessons = personLessons.reduce((acc, item) => (acc += item), 0);
  const people = personPeople.reduce((acc, item) => (acc += item), 0);
  const salary = personSalary.reduce((acc, item) => (acc += item), 0);

  const ctx = document.getElementById("myChart");
  const personLessonsHTML = document.querySelector(".person-lessons");
  const personPeopleHTML = document.querySelector(".person-people");
  const personSalaryHTML = document.querySelector(".person-salary");
  const personNameHTML = document.querySelector(".user-name");

  const graph = createGraph(personLessons);
  const myChart = new Chart(ctx, graph);
  personLessonsHTML.innerText = lessons;
  personPeopleHTML.innerText = people;
  personSalaryHTML.innerText = salary;
  personNameHTML.innerText = Auth.getUser().displayName;
}

function addFormListener(updated = true, id) {
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
      teacher: Auth.getUser().displayName,
      screenshot: document.getElementById("record-screenshot").value,
      notes: document.getElementById("record-notes").value.trim(),
      salary: Number(document.getElementById("record-type").value) * 350,
      user: Auth.getUser().uid,
    };

    if (updated === true) {
      Database.updateDBrecord(id, newRecord);
      setTimeout(() => {
        Modal.cancel();
        Database.getDBrecords();
      }, 500);
    } else {
      Database.createBDrecord(newRecord);
      Modal.cancel();
      Database.getDBrecords();
    }
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
                  <option value="4">4</option>
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
                <input type="url" id="record-link" value="${form.link}" required>
                <label>Teams link</label>
            </div>
            <div class="mui-select w-50">
                <select id="record-type" value="${form.type}" required>
                  <option value="2">Online</option>
                  <option value="1">Offline</option>
                </select>
                <label>Module type</label>
            </div>
        </div>
        <div class="mui-textfield">
                <input type="url" id="record-screenshot" value="${form.screenshot}" required>
                <label>Screenshot</label>
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

function addControlEvents() {
  const deleteBTNS = document.querySelectorAll(".row-delete a");
  const updateBTNS = document.querySelectorAll(".row-update a");

  deleteBTNS.forEach((btn) => {
    btn.addEventListener("click", deleteRecord);
  });
  updateBTNS.forEach((btn) => {
    btn.addEventListener("click", updateRecord);
  });
}

function renderRecord(record, id) {
  const theme = setThemeView(record.theme);
  const time = setRecordTime(record.type, record.time);
  return `
  <tr class="row mui-panel" data-id="${id}">
  <td class="row-icon ${theme.color}">
      ${theme.icon}
  </td>
  <td class="row-type">${theme.name}</td>
  <td class="row-date">${record.date}</td>
  <td class="row-time">${time}</td>
  <td class="row-teacher">${record.teacher}</td>
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
          <li class="row-update"><a href="#">Update</a></li>
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
  const recordId = record.dataset.id;

  Database.deleteDBrecord(recordId);
  record.remove();
}

function updateRecord(e) {
  e.preventDefault();
  const { target } = e;
  const record = target.closest(".row");
  const recordId = record.dataset.id;
  Database.getDBrecord(recordId);
}

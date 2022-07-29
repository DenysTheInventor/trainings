import { Modal } from "./modal.module";
import { returnFirstAndLastDate } from "../utils";
import { Database } from "./db.module";

export class Filter {
  static renderFilter() {
    const { firstDay, lastDay } = returnFirstAndLastDate();
    Modal.show("Filter:", setFilterForm(firstDay, lastDay));
    addFilterListener();
  }
}

function setFilterForm(startDate, endDate) {
  return `
        <form class="mui-form" id="filter-form">
        <div class="note-form__row">
            <div class="mui-textfield w-50">
                <input type="date" id="filter-startdate" value="${startDate}" required>
                <label>Start date: </label>
            </div>
            <div class="mui-textfield w-50">
                <input type="date" id="filter-enddate" value="${endDate}" required>
                <label>End date: </label>
            </div>
        </div>
        <button type="submit" class="mui-btn mui-btn--raised mui-btn--accent">Show records</button>
        </form>
        `;
}

function addFilterListener() {
  const filterForm = document.getElementById("filter-form");
  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newFilter = {
      startDate: +new Date(document.getElementById("filter-startdate").value),
      endDate: +new Date(document.getElementById("filter-enddate").value),
    };

    Modal.cancel();
    Database.getFilteredDBrecords(newFilter);
  });
}

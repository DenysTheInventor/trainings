import { Form } from "./form.module";
import { Auth } from "./auth.module";

export class Database {
  static createBDrecord(record, baseName = "records") {
    return fetch(
      `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/${baseName}.json`,
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
      });
  }

  static getDBrecords() {
    fetch(
      `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records.json`
    )
      .then((response) => response.json())
      .then((records) => {
        Form.renderList(records);
      });
  }

  static getFilteredDBrecords(filter) {
    fetch(
      `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records.json`
    )
      .then((response) => response.json())
      .then((records) => {
        const filteredRecords = {};
        for (const key in records) {
          records[key].systemDate >= filter.startDate &&
          records[key].systemDate <= filter.endDate
            ? (filteredRecords[key] = records[key])
            : null;
        }
        Form.renderList(filteredRecords);
      });
  }

  static getDBrecord(id) {
    console.log(
      `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records/${id}.json`
    );
    fetch(
      `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records/${id}.json`
    )
      .then((response) => response.json())
      .then((record) => {
        Form.handleUpdateForm(record, id);
      });
  }

  static deleteDBrecord(id) {
    fetch(
      `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }

  static updateDBrecord(id, record) {
    fetch(
      `https://giz-trainings-default-rtdb.asia-southeast1.firebasedatabase.app/records/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(record),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((updatedRecord) => {
        return updatedRecord;
      });
  }

  static filterData(records) {
    const currentUser = Auth.getUser().uid;
    for (const key in records) {
      if (records[key].user != currentUser) {
        delete records[key];
      }
    }
  }
}

export class Form {
  static create() {
    return `
        <form class="mui-form" id="record-form">
        <div class="note-form__row">
            <div class="mui-textfield w-20">
                <input type="text" id="record-group" value="1">
                <label>Group</label>
            </div>
            <div class="mui-select w-20">
                <select id="record-module" value="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">4</option>
                </select>
                <label>Module</label>
            </div>
            <div class="mui-select w-20">
                <select id="record-theme" value="1">
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
                <input type="text" id="record-people" value="3">
                <label>People</label>
            </div>
        </div>
        <div class="note-form__row">
            <div class="mui-textfield w-50">
                <input type="time" id="record-time" value="10:00">
                <label>Time</label>
            </div>
            <div class="mui-textfield w-50">
                <input type="date" id="record-date" value="2022-07-07">
                <label>Date</label>
            </div>
        </div>
        <div class="note-form__row">
            <div class="mui-textfield w-50">
                <input type="link" id="record-link" value="">
                <label>Teams link</label>
            </div>
            <div class="mui-select w-50">
                <select id="record-type" value="1">
                  <option value="1">Online</option>
                  <option value="2">Offline</option>
                </select>
                <label>Module type</label>
            </div>
        </div>
        <div class="mui-textfield">
          <textarea placeholder="Textarea">

          </textarea>
          <label>Notes</label>
        </div>
        <button type="submit" class="mui-btn mui-btn--raised">Save record</button>
        </form>
        `;
  }
}

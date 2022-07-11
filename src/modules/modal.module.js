export class Modal {
  static show(title, content) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const html = `
        <div class="modal-header">
            <h1>${title}</h1>
        </div>
        <div class="modal-content">${content}</div>
    `;

    modal.innerHTML = html;

    mui.overlay("on", modal);
  }

  static cancel() {
    mui.overlay("off");
  }
}

export class Modal {
  static show(title, content) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const html = `
        <div class="modal-header">
            <h1>${title}</h1>
        </div>
        <span class="modal-close">&times</span>
        <div class="modal-content">${content}</div>
    `;

    modal.innerHTML = html;
    mui.overlay("on", modal);

    document.querySelector(".modal-close").addEventListener("click", () => {
      mui.overlay("off");
    });
  }

  static cancel() {
    mui.overlay("off");
  }

  static service(status, text) {
    const icon = status
      ? `<i class="fa-solid fa-circle-check color-08cad1"></i>`
      : `<i class="fa-solid fa-circle-xmark color-ff6961"></i>`;

    const messageHTML = `
    <div class="service-message">
      ${icon}
      <span class="service-message__text">
        ${text}
      </span>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", messageHTML);

    setTimeout(() => {
      document.querySelector(".service-message").remove();
    }, 1500);
  }

  static toggleLoader() {
    const loader = document.querySelector(".loader");
    const isHidden = loader.hasAttribute("hidden");

    if (isHidden) {
      loader.removeAttribute("hidden");
      hideWeatherCard();
    } else {
      loader.setAttribute("hidden", "");
    }
  }
}

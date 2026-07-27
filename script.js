(() => {
  const config = window.SITE_CONFIG || {};
  const contacts = {
    email: config.contactEmail || "renkeho21@gmail.com",
    wechat: config.wechatId || "hytvchat",
  };

  document.querySelectorAll("[data-contact-value]").forEach((element) => {
    const value = contacts[element.dataset.contactValue];
    if (value) element.textContent = value;
  });

  const contactStatus = document.querySelector("#contact-status");

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Copy failed");
  }

  document.querySelectorAll("[data-copy-contact]").forEach((button) => {
    button.addEventListener("click", async () => {
      const type = button.dataset.copyContact;
      const value = contacts[type];
      const label = type === "email" ? "邮箱地址" : "微信号";
      const originalText = button.textContent;

      try {
        await copyText(value);
        button.textContent = "已复制";
        contactStatus.textContent = `${label} ${value} 已复制到剪贴板。`;
      } catch {
        contactStatus.textContent = `无法自动复制，请手动复制${label}：${value}`;
      }

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1800);
    });
  });

  const wechatQrImage = (config.wechatQrImage || "").trim();
  const qrImage = document.querySelector("#wechat-qr-image");
  const qrEmpty = document.querySelector("#wechat-qr-empty");
  const qrLabel = document.querySelector("#wechat-qr-label");

  if (wechatQrImage && qrImage && qrEmpty) {
    qrImage.src = wechatQrImage;
    qrImage.hidden = false;
    qrEmpty.hidden = true;
    qrLabel.textContent = "扫码添加微信";
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const dialog = document.querySelector("#image-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const dialogClose = document.querySelector(".dialog-close");
  const imageButtons = document.querySelectorAll(".image-button");

  imageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!dialog || !dialogImage) return;
      dialogImage.src = button.dataset.image;
      dialogImage.alt = button.dataset.alt;
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });

  function closeDialog() {
    if (!dialog) return;
    dialog.close();
    document.body.classList.remove("dialog-open");
    if (dialogImage) dialogImage.src = "";
  }

  if (dialogClose) dialogClose.addEventListener("click", closeDialog);

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("dialog-open");
      if (dialogImage) dialogImage.src = "";
    });
  }
})();

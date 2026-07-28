(() => {
  const config = window.SITE_CONFIG || {};
  const email = config.contactEmail || "renkeho21@gmail.com";
  const bookingUrl =
    config.bookingUrl || "https://wj.qq.com/s2/27425896/i3lw/";
  const bookingQrImage =
    config.bookingQrImage || "assets/interview-booking-qr.png";

  document
    .querySelectorAll('[data-contact-value="email"]')
    .forEach((element) => {
      element.textContent = email;
    });

  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    link.href = bookingUrl;
  });

  const qrImage = document.querySelector("#booking-qr-image");
  if (qrImage) qrImage.src = bookingQrImage;

  const contactStatus = document.querySelector("#contact-status");
  let statusTimer;

  function showContactStatus(message) {
    if (!contactStatus) return;

    window.clearTimeout(statusTimer);
    contactStatus.textContent = message;
    statusTimer = window.setTimeout(() => {
      contactStatus.textContent = "";
    }, 6000);
  }

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

  document.querySelectorAll('[data-copy-contact="email"]').forEach((button) => {
    button.addEventListener("click", async () => {
      const originalText = button.textContent.trim();

      try {
        await copyText(email);
        button.textContent = "已复制";
        showContactStatus(`邮箱地址 ${email} 已复制到剪贴板。`);
      } catch {
        showContactStatus(`无法自动复制，请手动复制邮箱地址 ${email}。`);
      }

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1800);
    });
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const dialog = document.querySelector("#image-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const dialogClose = document.querySelector(".dialog-close");
  const imageButtons = document.querySelectorAll(".image-button");
  let dialogTrigger;

  imageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!dialog || !dialogImage) return;

      dialogTrigger = button;
      dialogImage.src = button.dataset.image || "";
      dialogImage.alt = button.dataset.alt || "";
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });

  function resetDialog() {
    document.body.classList.remove("dialog-open");

    if (dialogImage) {
      dialogImage.removeAttribute("src");
      dialogImage.alt = "";
    }

    if (dialogTrigger) {
      dialogTrigger.focus();
      dialogTrigger = undefined;
    }
  }

  function closeDialog() {
    if (dialog?.open) dialog.close();
  }

  dialogClose?.addEventListener("click", closeDialog);

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", resetDialog);
  }
})();

(() => {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const contactEmail = config.contactEmail || "renkeho21@gmail.com";

  document.querySelectorAll('[data-contact-value="email"]').forEach((node) => {
    node.textContent = contactEmail;
  });

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-copy-contact]").forEach((button) => {
    button.addEventListener("click", async () => {
      const status = button.parentElement?.querySelector("[data-contact-status]");

      try {
        await navigator.clipboard.writeText(contactEmail);
        if (status) status.textContent = "邮箱已复制";
      } catch {
        if (status) status.textContent = `请手动复制 ${contactEmail}`;
      }
    });
  });

  const dialog = document.querySelector("#image-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const closeButton = dialog?.querySelector(".dialog-close");

  document.querySelectorAll("[data-image]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!dialog || !dialogImage || typeof dialog.showModal !== "function") return;

      dialogImage.src = button.dataset.image || dialogImage.src;
      dialogImage.alt = button.dataset.alt || "研究图片大图";
      dialog.showModal();
    });
  });

  closeButton?.addEventListener("click", () => dialog?.close());

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
})();

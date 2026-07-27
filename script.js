(() => {
  const config = window.SITE_CONFIG || {};
  const contactEmail = config.contactEmail || "renkeho21@gmail.com";
  const studyName = config.studyName || "HCI 研究访谈";
  const recruitmentOpen = config.recruitmentOpen !== false;
  const formEndpoint = (config.formEndpoint || "").trim();

  document.querySelectorAll(".contact-email").forEach((link) => {
    link.href = `mailto:${contactEmail}`;
    if (link.textContent.includes("@")) link.textContent = contactEmail;
  });

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#signup-form");
  const fallback = document.querySelector("#form-fallback");
  const status = document.querySelector("#form-status");
  const copyButton = document.querySelector("#copy-application");
  const openEmailAgain = document.querySelector("#open-email-again");
  const submitButton = form?.querySelector('button[type="submit"]');
  const submissionNote = document.querySelector("#submission-note");
  const submissionConsentText = document.querySelector("#submission-consent-text");
  let applicationText = "";
  let mailtoUrl = "";

  function makeApplication(nickname, contact) {
    return [
      `你好，我想报名参加“${studyName}”。`,
      "",
      `昵称：${nickname}`,
      `联系方式：${contact}`,
      "",
      "我已了解：提交报名不代表必须参加，正式访谈前将提供研究说明与知情同意材料。",
    ].join("\n");
  }

  if (form) {
    if (!recruitmentOpen) {
      form.querySelectorAll("input, button").forEach((control) => {
        control.disabled = true;
      });
      document.querySelector("#signup-title").textContent = "本轮招募已结束";
      document.querySelector(".panel-intro").textContent =
        "感谢关注。当前项目暂不接收新的报名，后续研究开放时会在此更新。";
      submitButton.textContent = "报名已结束";
      submissionNote.textContent = `如需咨询，请联系 ${contactEmail}。`;
    } else if (formEndpoint) {
      submitButton.innerHTML = '提交报名 <span aria-hidden="true">↗</span>';
      submissionConsentText.textContent =
        "我已了解：提交仅表示参与意向，不等于正式同意参加；访谈前会另行提供研究说明与知情同意材料。";
      submissionNote.textContent =
        "报名信息将通过已配置的表单服务发送给研究者，仅用于本次研究的招募与联络。";
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!recruitmentOpen) return;
      if (!form.reportValidity()) return;

      const nickname = form.elements.nickname.value.trim();
      const contact = form.elements.contact.value.trim();
      applicationText = makeApplication(nickname, contact);

      if (formEndpoint) {
        fallback.hidden = false;
        submitButton.disabled = true;
        status.textContent = "正在提交报名信息…";

        try {
          const response = await fetch(formEndpoint, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
          });
          if (!response.ok) throw new Error("Form submission failed");
          form.reset();
          fallback.querySelector(".fallback-actions").hidden = true;
          status.textContent = "报名已提交。研究者将通过你留下的联系方式确认后续安排。";
        } catch {
          fallback.querySelector(".fallback-actions").hidden = false;
          status.textContent = "在线提交暂时失败。你可以改用邮件完成报名。";
          const subject = encodeURIComponent(`研究报名｜${studyName}｜${nickname}`);
          const body = encodeURIComponent(applicationText);
          mailtoUrl = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
          openEmailAgain.href = mailtoUrl;
        } finally {
          submitButton.disabled = false;
        }
        return;
      }

      const subject = encodeURIComponent(`研究报名｜${studyName}｜${nickname}`);
      const body = encodeURIComponent(applicationText);
      mailtoUrl = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

      fallback.hidden = false;
      fallback.querySelector(".fallback-actions").hidden = false;
      status.textContent = "报名邮件已生成。请在打开的邮件应用中确认并发送；如未打开，可复制报名信息。";
      openEmailAgain.href = mailtoUrl;
      window.location.href = mailtoUrl;
    });
  }

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      if (!applicationText) return;
      const copyText = `${applicationText}\n\n收件人：${contactEmail}`;
      try {
        await navigator.clipboard.writeText(copyText);
        status.textContent = `报名信息已复制，请发送至 ${contactEmail}。`;
        copyButton.textContent = "已复制";
      } catch {
        status.textContent = `无法自动复制，请手动发送昵称和联系方式至 ${contactEmail}。`;
      }
    });
  }

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

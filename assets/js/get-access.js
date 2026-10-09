document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("access-form");
  if (!form) return;

  const button = document.getElementById("access-submit");
  const message = document.getElementById("access-message");
  const apiUrl = form.dataset.apiUrl;

  function showMessage(text, type = "error") {
    message.textContent = text;
    message.className = `access-message access-message-${type}`;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!apiUrl || apiUrl.includes("REPLACE")) {
      showMessage("The access-request API has not been configured yet.");
      return;
    }

    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      institution: form.elements.institution.value.trim(),
      role: form.elements.role.value,
      purpose: form.elements.purpose.value.trim(),
      accepted_terms: form.elements.terms.checked,
      website: form.elements.website.value,
    };

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Submitting…";
    message.textContent = "";
    message.className = "access-message";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result = {};
      try {
        result = await response.json();
      } catch (_) {}

      if (!response.ok) {
        if (result.fields) {
          const firstFieldError = Object.values(result.fields)[0];
          throw new Error(firstFieldError);
        }
        throw new Error(result.error || "Unable to submit your request.");
      }

      window.location.assign("/request-submitted/");
    } catch (error) {
      showMessage(error.message || "Unable to submit your request. Please try again.");
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});

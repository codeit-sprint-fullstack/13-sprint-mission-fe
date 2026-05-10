function getValidator() {
  return {
    validate: (id, value) => {
      if (id === "name") {
        return value.length < 1 || value.length > 10
          ? "1자 이상, 10자 이내로 입력해주세요"
          : "";
      }
      if (id === "description") {
        return value.length < 10 || value.length > 100
          ? "10자 이상, 100자 이내로 입력해주세요"
          : "";
      }
      if (id === "price") {
        return isNaN(value) || value === "" ? "숫자로 입력해주세요" : "";
      }
      if (id === "tagInput") {
        return value.length > 5 ? "5글자 이내로 입력해주세요" : "";
      }
      return "";
    },
    updateUI: (id, errorMsg) => {
      const inputEl = document.getElementById(id);
      if (!inputEl) return;
      const group = inputEl.parentElement;
      const errorEl = group.querySelector(".error-message");

      if (errorMsg) {
        group.classList.add("error");
        if (errorEl) errorEl.textContent = errorMsg;
      } else {
        group.classList.remove("error");
        if (errorEl) errorEl.textContent = "";
      }
    },
  };
}

const { validate, updateUI } = getValidator();
const tags = new Set();

function refreshForm() {
  const fields = ["name", "description", "price"];
  let isAllValid = true;

  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el || validate(id, el.value) !== "" || el.value === "")
      isAllValid = false;
  });

  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn) submitBtn.disabled = !isAllValid;
}

["name", "description", "price"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", (e) => {
      updateUI(id, validate(id, e.target.value));
      refreshForm();
    });
  }
});

const tagInput = document.getElementById("tagInput");
if (tagInput) {
  tagInput.addEventListener("keydown", (e) => {
    if (e.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();

      const val = tagInput.value.trim();
      const error = validate("tagInput", val);

      if (error) {
        updateUI("tagInput", error);
      } else if (val && !tags.has(val)) {
        tags.add(val);
        tagInput.value = "";
        updateUI("tagInput", "");
        renderTags();
      }
    }
  });
}

function renderTags() {
  const container = document.getElementById("tagContainer");
  if (!container) return;

  container.innerHTML = Array.from(tags)
    .map(
      (t) => `
    <span class="tag-chip">
      #${t} 
      <button type="button" onclick="removeTag('${t}')">X</button>
    </span>
  `,
    )
    .join("");
}

window.removeTag = (t) => {
  tags.delete(t);
  renderTags();
};

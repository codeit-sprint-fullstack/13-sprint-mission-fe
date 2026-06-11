const toggles = document.getElementsByClassName("input-toggle");

for (let toggle of toggles) {
  let pwInput = toggle.previousElementSibling;

  toggle.addEventListener("click", () => {
    if (pwInput.type === "password") {
      //hidden
      pwInput.type = "text";
      toggle.src = "../../../assets/icons/ic_btn_visibility_on.png";
    } else if (pwInput.type === "text") {
      //visible
      pwInput.type = "password";
      toggle.src = "../../../assets/icons/ic_btn_visibility_off.png";
    }
  });
}

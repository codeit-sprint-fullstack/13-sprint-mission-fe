function setupToggle(btnId, inputId) {
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);

  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      btn.querySelector("img").src = "../images/btn_visiblity_on.png";
    } else {
      input.type = "password";
      btn.querySelector("img").src = "../images/btn_visiblity_off.png";
    }
  });
}

// 로그인 페이지
setupToggle("sign-in-pwd-toggle-btn", "sign-in-pwd");

// 회원가입 페이지
setupToggle("sign-up-pwd-toggle-btn", "sign-up-pwd");
setupToggle("sign-up-pwd-check-toggle-btn", "sign-up-pwd-check");

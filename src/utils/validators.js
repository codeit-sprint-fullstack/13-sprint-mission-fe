export function validateEmail(email) {
  if (!email.includes("@")) return "잘못된 이메일입니다.";
  return "";
}

export function validatePassword(password) {
  if (password.length < 8) return "비밀번호를 8자 이상 입력해주세요";
  return "";
}

export function validatePasswordConfirmation(password, passwordConfirmation) {
  if (password !== passwordConfirmation) return "비밀번호가 일치하지 않습니다.";
  return "";
}

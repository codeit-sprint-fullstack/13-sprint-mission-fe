export default function validateAuthForm(formData, type) {
  const errors = {};

  if (!formData.email.trim()) errors.emailErr = "이메일을 입력해주세요";

  if (type === "signup" && !formData.nickname.trim())
    errors.nicknameErr = "닉네임을 입력해주세요";

  if (!formData.password.trim()) errors.passwordErr = "패스워드를 입력해주세요";
  else if (formData.password.length < 8)
    errors.passwordErr = "비밀번호를 8자 이상 입력해주세요";

  if (type === "signup" && formData.password !== formData.passwordConfirmation)
    errors.confirmErr = "비밀번호가 일치하지 않습니다";

  return errors;
}

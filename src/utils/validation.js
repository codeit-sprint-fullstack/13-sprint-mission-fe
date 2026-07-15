//이메일 validate
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

//패스워드 validate
export const validatePassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
    password,
  );
};

//패스워드 확인 validate
export const validateCheckedPassword = (password, checkedPassword) => {
  return password === checkedPassword;
};

//상품명 validate
export const validateName = (data) => {
  return data.trim().length <= 10;
};

//상품소개 validate
export const validateDescription = (data) => {
  return data.trim().length >= 10;
};

//태그 validate
export const validateTag = (data) => {
  return data.trim().length <= 5;
};

//숫자 validate (ex. 판매가격 validate)
export const validateNumber = (data) => {
  return !isNaN(+data);
};

//이미지들 validate
export const validateImages = (data) => {
  return data.length <= 3;
};

//필드가 비었는지 확인하는 함수
export const isEmpty = (value) => {
  if (Array.isArray(value)) return value.length === 0;

  if (typeof value === "object" && value !== null) {
    return Object.keys(value).length === 0;
  }

  return !value;
};

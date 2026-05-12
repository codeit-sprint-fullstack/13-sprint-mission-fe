export default function useValidation(name, description, price, taginput) {
  const errors = {};
  if (!(name.trim().length >= 1 && name.trim().length < 10)) {
    errors.name = "10자 이내로 입력해주세요";
  }
  if (!(description.trim().length >= 10 && description.trim().length < 100)) {
    errors.description = "10자 이상 입력해주세요";
  }
  if (isNaN(Number(price)) || price.length < 1) {
    errors.price = "숫자로 입력해주세요";
  }
  if (taginput.trim().length !== 0 && taginput.trim().length > 5) {
    errors.taginput = "5글자 이내로 입력해주세요";
  }
  return errors;
}

import { useState } from 'react';

const useProductForm = () => {
  const [values, setValues] = useState({ name: '', desc: '', price: '' });
  const [errors, setErrors] = useState({});
  const [tags, setTags] = useState([]);

  const validate = (name, value) => {
    let error = "";
    if (name === 'name') {
      if (value.length < 1 || value.length > 10) error = "상품명은 1~10자 이내여야 합니다.";
    }
    if (name === 'desc') {
      if (value.length < 10 || value.length > 100) error = "소개는 10~100자 이내여야 합니다.";
    }
    if (name === 'price') {
      if (value.length < 1) error = "가격을 입력해주세요.";
      else if (!/^\d+$/.test(value)) error = "숫자만 입력 가능합니다.";
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  // 등록 버튼 활성화 조건
  const isFormValid = 
    values.name && !errors.name && 
    values.desc && !errors.desc && 
    values.price && !errors.price && 
    tags.length > 0;

  return { values, errors, tags, setTags, handleChange, isFormValid };
};

export default useProductForm;
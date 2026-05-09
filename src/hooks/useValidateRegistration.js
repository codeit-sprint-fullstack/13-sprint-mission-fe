import React, { useState } from "react";

const useValidateRegistration = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [isTooShort, setIsTooShort] = useState(false);
  const [isTooLong, setIsTooLong] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isVeryShort, setIsVeryShort] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChangeName = (e) => {
    const value = e.target.value;
    setName(value);
    value.length > 10 ? setIsTooShort(true) : setIsTooShort(false);
  };

  const handleChangedesc = (e) => {
    const value = e.target.value;
    setDescription(value);
    value.length < 10 ? setIsTooLong(true) : setIsTooLong(false);
  };

  const handleChangeprice = (e) => {
    const value = e.target.value;
    setPrice(value);
    isNaN(value) ? setIsNumber(true) : setIsNumber(false);
  };

  const handleChangetag = (e) => {
    const value = e.target.value;
    setTag(value);
    value.length > 5 ? setIsVeryShort(true) : setIsVeryShort(false);
  };

  return {
    name,
    description,
    price,
    tag,
    isTooShort,
    isTooLong,
    isNumber,
    isVeryShort,
    handleChangedesc,
    handleChangeName,
    handleChangeprice,
    handleChangetag,
  };
};

export default useValidateRegistration;

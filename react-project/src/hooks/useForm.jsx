import React from "react";
import { isEmpty } from "@/utils";

export default function useForm({ data, validationFns }) {
  const validationResults = {};
  let isValidated = false;

  //초기상태일시 form은 disabled 리턴
  if (Object.values(data).every(isEmpty)) {
    Object.keys(data).forEach((key) => {
      validationResults[key] = false;
    });
    return { validationResults, isValidated };
  }

  //초기상태 아닐시 {key:bool}형태의 validation 결과 리턴
  //모든 결과값에 따라 form disabled 여부 계산
  Object.keys(data).forEach((key, i) => {
    if (!validationFns[i])
      validationResults[key] = true; //별도의 validator함수 미제공시 그냥 true 리턴
    else validationResults[key] = validationFns[i](data[key]);
  });
  isValidated = Object.values(validationResults).every((result) => result);

  return { validationResults, isValidated };
}

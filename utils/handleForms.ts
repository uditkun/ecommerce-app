import { FormEvent, RefObject } from "react";
import { getLocalProducts } from "./getLocalProducts";

// const getFormValues = (currentRef: any) => {
//   let modifiedData: any = {};
//   Object.keys(currentRef).forEach((formKey: any) => {
//     modifiedData[formKey] = currentRef[formKey].value;
//   });
//   return modifiedData;
// };

const validateForm = (formData: any): boolean => {
  const validRegex: any = {
    email:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    password: /[^_]\w{7,12}/,
  };

  const isVerified = Object.keys(validRegex).every((item: string) => {
    return validRegex[item].test(String(formData[item]));
  });

  return isVerified;
};

// const headerFormSubmit = (
//   e: FormEvent,
//   formRef: RefObject<HTMLInputElement>
// ) => {
//   e.preventDefault();
//   const searchVal = formRef.current?.value;
//   //need some kind of validation
//   if (searchVal) {
//   }
//   console.log(searchVal);
// };

const getHref = (name: string) => {
  return name
    .split(" ")
    .map((i) => i.toLowerCase())
    .join("_");
};

export { validateForm, getHref };

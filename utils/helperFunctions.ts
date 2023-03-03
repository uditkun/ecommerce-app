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

const getHref = (name: string) => {
  return name
    .split(" ")
    .map((i) => i.toLowerCase())
    .join("_");
};

export { validateForm, getHref };

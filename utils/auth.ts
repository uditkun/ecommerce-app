import authData from "../dummyDB/authData.json";
import { AES, enc } from "crypto-js";

const dbGetUser = async (formData: any) => {
  const authInstance = authData.slice();
  const getUser: any = await authInstance.find(
    (userInfo: any) => formData.email === userInfo.email
  );
  // console.log(getUser);
  return getUser;
};

const encryptUser = (userData: string): string => {
  const cipherText = AES.encrypt(
    JSON.stringify(userData),
    "topSecretKey"
  ).toString();
  return JSON.stringify(cipherText);
};

const decryptUser = (userData: string | null): string => {
  if (userData) {
    const bytes = AES.decrypt(JSON.parse(userData), "topSecretKey");
    return JSON.parse(bytes.toString(enc.Utf8));
  }
  return "";
};

const validateAuth = (validData: any, dataToValidate: any): boolean => {
  //If data auth is using localStorage
  const userExists = Object.keys(dataToValidate).every((credential: any) => {
    // console.log(dataToValidate[credential] === validData[credential]);
    return dataToValidate[credential] === validData[credential];
  });
  return userExists;
};

const getAuth = async (formData: any) => {
  // Check if localStorage auth is valid
  let localAuth = decryptUser(localStorage.getItem("auth"));

  if (localAuth) {
    const isLocalAuthValid = validateAuth(localAuth, formData);
    return isLocalAuthValid && localAuth;
  } else {
    const userData = await dbGetUser(formData);

    if (userData && validateAuth(userData, formData)) {
      let encryptedUserAuth = encryptUser(userData);
      localStorage.setItem("auth", encryptedUserAuth);
      return userData;
    } else {
      console.log("Invalid Credentials");
      return undefined;
    }
  }
};

const logIn = async (formData: any) => {
  return await getAuth(formData);
};

const parseLocalAuth = (encryptedLocalAuth: string | null): string => {
  return decryptUser(encryptedLocalAuth);
};

const encLocalAuth = (auth: string): string => {
  return encryptUser(auth);
};

export { logIn, parseLocalAuth, encLocalAuth };

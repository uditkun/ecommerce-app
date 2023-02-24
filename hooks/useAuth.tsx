import { auth } from "../utils/firebase";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { ACTIONS, useDispatchGlobalState } from "../components/Context";

const useAuth = () => {
  const dispatch = useDispatchGlobalState();

  const getAuthInfo = async (data: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    try {
      const user = userCredential.user;
      console.log(user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   // if (user) {
    //   //   dispatch({ type: ACTIONS.AUTH, payload: user });
    //   // } else {
    //   //   console.log("No user found, Please retry");
    //   // }
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
    // });
  };
  return { getAuthInfo };
};

export default useAuth;

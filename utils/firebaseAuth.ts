import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ACTIONS, useDispatchGlobalState } from "../components/Context";

const useAuth = () => {
  const dispatch = useDispatchGlobalState();

  const getAuthInfo = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // if (user) {
        //   dispatch({ type: ACTIONS.AUTH, payload: user });
        // } else {
        //   console.log("No user found, Please retry");
        // }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return { getAuthInfo };
};

export default useAuth;

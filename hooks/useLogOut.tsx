import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { ACTIONS, useDispatchGlobalState } from "../components/Context";
import { auth } from "../utils/firebase";

const useLogOut = () => {
  const dispatch = useDispatchGlobalState();
  const router = useRouter();

  return () => {
    signOut(auth)
      .then((result) => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch({ type: ACTIONS.AUTH, payload: {} });
    dispatch({ type: ACTIONS.USER, payload: {} });
    router.push("/");
  };
};

export default useLogOut;

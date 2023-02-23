import { useRouter } from "next/router";
import { ACTIONS, useDispatchGlobalState } from "../components/Context";

const useLogOut = () => {
  const dispatch = useDispatchGlobalState();
  const router = useRouter();

  return () => {
    dispatch({ type: ACTIONS.AUTH, payload: null });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    router.push("/");
  };
};

export default useLogOut;

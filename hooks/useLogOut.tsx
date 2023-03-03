import { deleteUser, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ACTIONS, useDispatchGlobalState } from "../components/Context";
import { auth, db } from "../utils/firebase";

const useLogOut = () => {
  const dispatch = useDispatchGlobalState();
  const router = useRouter();

  return async () => {
    if (auth.currentUser?.isAnonymous) {
      try {
        await deleteDoc(doc(db, "users", auth.currentUser.uid));
        await deleteUser(auth.currentUser)
          .then((result) => {
            console.log("user deleted");
          })
          .catch((error) => {
            console.log(error);
          });
        signOut(auth)
          .then((result) => {
            console.log("logged out");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("error");
      }
    } else {
      signOut(auth)
        .then((result) => {
          console.log("logged out");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    dispatch({ type: ACTIONS.AUTH, payload: {} });
    dispatch({ type: ACTIONS.USER, payload: {} });
    router.push("/");
  };
};

export default useLogOut;

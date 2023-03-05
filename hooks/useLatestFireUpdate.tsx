import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import {
  ACTIONS,
  useDispatchGlobalState,
  useGlobalState,
} from "../components/Context";
import { auth, db } from "../utils/firebase";

const useLatestFireUpdate = () => {
  const globalState = useGlobalState();
  const dispatch = useDispatchGlobalState();
  useEffect(() => {
    console.log("snap run");
    let unSubscribe = () => {};
    if (globalState.auth.uid) {
      const userRef = doc(db, "users", auth.currentUser!.uid);
      unSubscribe = onSnapshot(userRef, (snap) => {
        dispatch({
          type: ACTIONS.USER,
          payload: snap.data() ?? {
            cart: [],
            wishlist: [],
            purchasedItems: [],
          },
        });
      });
    }
    return () => {
      return unSubscribe();
    };
  }, [dispatch, globalState.auth.uid]);
};

export default useLatestFireUpdate;

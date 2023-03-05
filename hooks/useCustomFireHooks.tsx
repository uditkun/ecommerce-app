import { auth, db, provider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInAnonymously,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  ACTIONS,
  useDispatchGlobalState,
  useGlobalState,
} from "../components/Context";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { CartProduct, Product } from "../utils/types/Product";
import useLatestFireUpdate from "./useLatestFireUpdate";

const useCustomFireHooks = () => {
  const dispatch = useDispatchGlobalState();
  const globalState = useGlobalState();
  const router = useRouter();

  useLatestFireUpdate();

  const login = async (data: { email: string; password: string }) => {
    // seting persistence then sigininwithemailandpassword
    //then updating state using authstatechanged

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      alert("useAuth auth set");
      if (user) {
        dispatch({ type: ACTIONS.AUTH, payload: user });
        const userData = await getDoc(
          doc(db, "users", auth.currentUser!.uid)
        ).then((res) => res.data());
        dispatch({ type: ACTIONS.USER, payload: userData });
        router.push("/");
      } else {
        alert("Error, retry login");
      }
    });
    unsubscribe();
  };

  const signUp = async (data: {
    email: string;
    password: string;
    name: string;
    agreeToTnC: boolean;
  }) => {
    //check if agreed to tnc
    //createuserwithemailandpassword
    //set initial data in firestore and client side
    //run authstatechanged function

    if (!data.agreeToTnC) {
      alert("Please agree to the terms to proceed");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: data.name });
      const initialData = {
        id: user.uid,
        name: data.name,
        email: data.email,
        gender: "",
        address: [],
        purchasedItems: [],
        cart: [],
        wishlist: [],
        phone: [],
      };
      await setDoc(doc(db, "users", user.uid), initialData);
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch({ type: ACTIONS.AUTH, payload: user });
          dispatch({ type: ACTIONS.USER, payload: initialData });
          router.push("/");
        } else {
          alert("Please retry");
        }
      });
      unsubscribe();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    }
  };

  const updateUserArrayData = async (item: {
    title: string;
    operation: string;
    data: CartProduct | Product;
  }) => {
    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser!.uid);

    if (item.operation === "add") {
      await updateDoc(userRef, {
        [item.title]: arrayUnion(item.data),
      });
      console.log("item add done");
    } else if (item.operation === "remove") {
      await updateDoc(userRef, {
        [item.title]: arrayRemove(item.data),
      });
      console.log("item remove done");
    }
  };

  const usingGoogleAuth = async () => {
    await signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        //for both login and signup
        const user = userCredential.user;
        const isUserPresent = await getDoc(doc(db, "users", user.uid)).then(
          (res) => res.data()
        );
        if (isUserPresent) {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
              dispatch({ type: ACTIONS.AUTH, payload: user });
              dispatch({ type: ACTIONS.USER, payload: isUserPresent });
              router.push("/");
            } else {
              alert("Error, retry login");
            }
          });
          unsubscribe();
        } else {
          const initialData = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            gender: "",
            address: [],
            purchasedItems: [],
            cart: [],
            wishlist: [],
            phone: [],
          };
          await setDoc(doc(db, "users", user.uid), initialData);
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
              dispatch({ type: ACTIONS.AUTH, payload: user });
              dispatch({ type: ACTIONS.USER, payload: initialData });
              router.push("/");
            } else {
              alert("Please retry");
            }
          });
          unsubscribe();
        }
      })
      .catch(async (error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          const pendingCredential = error.credential;
          const email = error.email;

          fetchSignInMethodsForEmail(auth, email).then(async (methods) => {
            if (methods[0] === "password") {
              const password = prompt("password");
              if (password) {
                await signInWithEmailAndPassword(auth, email, password)
                  .then(function (result) {
                    return linkWithCredential(result.user, pendingCredential);
                  })
                  .then(function () {
                    router.push("/");
                  })
                  .catch((error) => {
                    alert("Error while signup" + error.code);
                    return;
                  });
              }
              return;
            }
          });
        } else {
          alert(error.code);
          return;
        }
      });
  };

  const anyonmousAuth = async () => {
    await signInAnonymously(auth).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const initialData = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            gender: "",
            address: [],
            purchasedItems: [],
            cart: [],
            wishlist: [],
            phone: [],
          };
          await setDoc(doc(db, "users", user.uid), initialData);
          dispatch({ type: ACTIONS.AUTH, payload: user });
          dispatch({ type: ACTIONS.USER, payload: initialData });
          router.push("/");
        } else {
          alert("Error, retry login");
        }
      });
      unsubscribe();
    });
  };

  const forgotPassword = async () => {
    const email = prompt("Enter your email address");
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email && emailRegex.test(email)) {
      await sendPasswordResetEmail(auth, email)
        .then(() => alert("sent"))
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Invalid email. Please try again");
    }
  };

  const updateUserProfile = async (data: any) => {
    const userRef = doc(db, "users", auth.currentUser!.uid);
    await updateDoc(userRef, data)
      .then(() => {
        console.log("updated");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return {
    login,
    signUp,
    updateUserArrayData,
    updateUserProfile,
    usingGoogleAuth,
    anyonmousAuth,
    forgotPassword,
  };
};

export default useCustomFireHooks;

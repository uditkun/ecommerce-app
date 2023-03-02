import { auth, db, provider } from "../utils/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInAnonymously,
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
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { CartProduct, Product } from "../utils/types/Product";
import { useEffect, useState } from "react";

const useCustomFireHooks = () => {
  const dispatch = useDispatchGlobalState();
  const globalState = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    let unSubscribe = () => {};
    if (globalState.auth.uid) {
      const userRef = doc(db, "users", auth.currentUser!.uid);
      unSubscribe = onSnapshot(userRef, (snap) => {
        console.log(snap.data());
        dispatch({ type: ACTIONS.USER, payload: snap.data() });
        console.log("run snapshot");
      });
    }
    return () => {
      console.log("unsub snapshot");
      return unSubscribe();
    };
  }, [dispatch, globalState.auth.uid]);

  const login = async (data: { email: string; password: string }) => {
    // seting persistence then sigininwithemailandpassword
    //then updating state using authstatechanged
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("useAuth auth set");
      if (user) {
        dispatch({ type: ACTIONS.AUTH, payload: user });
        const userData = await getDoc(
          doc(db, "users", auth.currentUser!.uid)
        ).then((res) => res.data());
        dispatch({ type: ACTIONS.USER, payload: userData });
        router.push("/");
      } else {
        console.log("Error, retry login");
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
      console.log("Please agree to the terms to proceed");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
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
          console.log("Please retry");
        }
      });
      unsubscribe();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const updateUserData = async (item: {
    title: string;
    operation: string;
    data: CartProduct | Product;
  }) => {
    if (!auth.currentUser!.uid) {
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
        const user = userCredential.user;
        const isUserPresent = await getDoc(doc(db, "users", user.uid)).then(
          (res) => res.data()
        );
        if (isUserPresent) {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("useAuth auth set");
            if (user) {
              dispatch({ type: ACTIONS.AUTH, payload: user });
              dispatch({ type: ACTIONS.USER, payload: isUserPresent });
              router.push("/");
            } else {
              console.log("Error, retry login");
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
              console.log("Please retry");
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
                    console.log("Error while signup", error.code);
                    return;
                  });
              }
              return;
            }
          });
        } else {
          console.log(error.code);
          return;
        }
      });
  };

  const anyonmousAuth = async () => {
    await signInAnonymously(auth).then(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log("useAuth auth set");
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
          console.log(user);
          dispatch({ type: ACTIONS.AUTH, payload: user });
          dispatch({ type: ACTIONS.USER, payload: initialData });
          router.push("/");
        } else {
          console.log("Error, retry login");
        }
      });
      unsubscribe();
    });
  };
  return { login, signUp, updateUserData, usingGoogleAuth, anyonmousAuth };
};

export default useCustomFireHooks;

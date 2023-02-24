import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FormEvent, useRef, useState } from "react";
import { logIn } from "../utils/auth";
import {
  useGlobalState,
  useDispatchGlobalState,
  ACTIONS,
} from "../components/Context";
import { useRouter } from "next/router";
import { validateForm } from "../utils/handleForms";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

function LogIn() {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const router = useRouter();
  const { auth } = useGlobalState();
  const dispatch = useDispatchGlobalState();
  const { getAuthInfo } = useAuth();

  if (auth) {
    router.push("/dashboard");
  }

  const authLogin = async (
    e: any,
    customData?: { email: string; password: string }
  ) => {
    e.preventDefault();
    // let data = formData;
    // if (customData) {
    //   data = customData;
    // }
    // console.log(data);
    // if (validateForm(data)) {
    //   // const authUserData = await logIn(data);
    //   // if (authUserData) {
    //   //   dispatch({ type: ACTIONS.AUTH, payload: authUserData });
    //   //   router.back();
    //   // }
    //   getAuthInfo(data);
    // } else {
    //   console.log("Email or password not in correct format");
    // }
    // return;
    // const values = getFormValues(formData.current);
    // // console.log(values);
    // const authInfo = await logIn(values);
    // // console.log(authInfo);
    // if (authInfo) {
    //   dispatch({ type: ACTIONS.AUTH, payload: authInfo });
    //   // router.push("/");
    // } else {
    //   console.log("Couldn't Retrive Data");
    // }
  };

  return (
    <form onSubmit={(e) => authLogin(e)} className="pt-12">
      <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
        <p className="text-3xl font-bold mb-8">Log In</p>
        <div className="w-full sm:w-4/5 min-w-60">
          <button
            disabled
            className="w-full py-3 px-6 flex justify-center gap-6 items-center border-2 rounded-sm opacity-50"
          >
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            <p>Log in with Google</p>
          </button>
          <button
            disabled
            className="w-full py-3 px-6 flex justify-center gap-6 items-center mt-2 border-2 rounded-sm mb-4 opacity-50"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-[24px]" />
            <p>Log in with Facebook</p>
          </button>
          <button
            className="w-full py-3 px-6 flex justify-center gap-6 items-center mt-2 border-2 rounded-sm mb-4 bg-gray-600"
            onClick={(e) => {
              authLogin(e, {
                email: "john@gmail.com",
                password: "mynameisjohn",
              });
            }}
          >
            <FontAwesomeIcon icon={faUser} color="white" />
            <p className="text-white">Log in as Guest</p>
          </button>

          <div className="py-4 flex flex-col gap-3">
            <input
              className="rounded border-0 shadow-light-step"
              type="email"
              name="email"
              placeholder="Email/Number"
              required
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <input
              className="rounded border-0 shadow-light-step"
              type="password"
              name="password"
              minLength={7}
              placeholder="Password"
              required
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
            <button
              type="submit"
              className="w-full py-2 bg-gray-600 rounded-sm text-white"
            >
              Log In
            </button>
            <Link href="#" className="hover:underline hover:text-orange-500">
              Forgot Password
            </Link>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="hover:text-blue-500 underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LogIn;

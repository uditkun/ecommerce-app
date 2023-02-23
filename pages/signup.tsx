import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";
// import { validateForm } from "../utils/handleForms";
import { ACTIONS, useDispatchGlobalState } from "../components/Context";
import { useRouter } from "next/router";

function SignUp() {
  const formData: any = useRef({
    name: null,
    email: null,
    password: null,
    agreeToTnC: false,
  });
  const dispatch = useDispatchGlobalState();
  const router = useRouter();
  return (
    <div className="pt-12">
      <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
        <p className="text-3xl font-bold mb-8">Sign up</p>
        <div className="w-full sm:w-4/5 min-w-60">
          <button
            disabled
            className=" w-full py-3 px-6 flex justify-center gap-6 items-center border-2 rounded-sm opacity-50"
          >
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            <p>Sign up with Google</p>
          </button>
          <button
            disabled
            className=" w-full py-3 px-6 flex justify-center gap-6 items-center mt-2 border-2 rounded-sm opacity-50"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-[24px]" />
            <p>Sign up with Facebook</p>
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const { name, email, password, agreeToTnC } = formData.current;
              if (agreeToTnC) {
                const authSet = {
                  name,
                  email,
                  password,
                  id: Math.floor(Math.random() * 10000),
                  gender: "",
                  address: [],
                  purchasedItems: [],
                  wishlist: [],
                  phone: [],
                };
                dispatch({ type: ACTIONS.AUTH, payload: authSet });
                router.back();
              } else {
                return;
              }
              // const data = formData.current;
              // if (validateForm(data)) {
              //   console.log(data);
              // } else {
              //   console.log("Email or password not in correct format");
              // }
              // return;
            }}
            className="py-4 flex flex-col gap-3"
          >
            <input
              className="rounded border-0 shadow-light-step"
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => {
                formData.current.name = e.target.value;
              }}
              required
            />
            <input
              className="rounded border-0 shadow-light-step"
              type="email"
              name="email"
              placeholder="Email/Number"
              onChange={(e) => {
                formData.current.email = e.target.value;
              }}
              required
            />
            <input
              className="rounded border-0 shadow-light-step"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                formData.current.password = e.target.value;
              }}
              required
            />
            {/* box-shadow:{"light-step": "0px 0px 10px 2px #e5e5e5"} */}
            <p className="ml-2">
              <input
                type="checkbox"
                required
                onChange={(e) =>
                  (formData.current.agreeToTnC = e.currentTarget.checked)
                }
                id="#terms"
              />{" "}
              I agree to the{" "}
              <Link href="/terms" className="text-sky-400">
                Terms and Conditions
              </Link>
              .
            </p>
            <button
              type="submit"
              className="w-full py-2 bg-gray-600 rounded-sm text-white"
            >
              Sign Up
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-400">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

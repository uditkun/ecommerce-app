import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { useGlobalState } from "../components/Context";
import { useRouter } from "next/router";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useCustomFireHooks from "../hooks/useCustomFireHooks";

function LogIn() {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );

  const { auth, user } = useGlobalState();
  const { login, usingGoogleAuth, anyonmousAuth } = useCustomFireHooks();

  // useEffect(() => {
  //   if (Object.keys(auth).length) {
  //     console.log(Object.keys(auth).length);
  //     router.push("/");
  //   }
  // }, [auth, router]);

  const authLogin = async (e: any) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      login(formData);
    }
  };

  return (
    <>
      {!Object.keys(auth).length ? (
        <div className="pt-12">
          <div className="flex flex-col justify-center items-center p-4 max-w-lg mx-auto">
            <p className="text-3xl font-bold mb-8">Log In</p>
            <div className="w-full sm:w-4/5 min-w-60">
              <button
                className="w-full py-3 px-6 flex justify-center gap-6 items-center border-2 rounded-sm"
                onClick={() => usingGoogleAuth()}
              >
                <FontAwesomeIcon icon={faGoogle} size="lg" />
                <p>Log in with Google</p>
              </button>

              <button
                className="w-full py-3 px-6 flex justify-center gap-6 items-center mt-2 border-2 rounded-sm mb-4 bg-gray-600"
                onClick={() => {
                  anyonmousAuth();
                }}
              >
                <FontAwesomeIcon icon={faUser} color="white" />
                <p className="text-white">Log in as Guest</p>
              </button>

              <form onSubmit={(e) => authLogin(e)}>
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
                  <Link
                    href="#"
                    className="hover:underline hover:text-orange-500"
                  >
                    Forgot Password
                  </Link>
                  <p>
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="hover:text-blue-500 underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Already logged in as {user?.name ?? "Anyonmous"}</p>
        </div>
      )}
    </>
  );
}

export default LogIn;

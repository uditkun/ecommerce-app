import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseLocalAuth } from "../utils/auth";

const useIsAuthDone = () => {
  const router = useRouter();

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    if (!localAuth) {
      router.push("/login");
      return;
    }
    const auth = JSON.parse(parseLocalAuth(localAuth));
    if (!auth.id && !auth.name && !auth.password) {
      router.push("/login");
    }
  }, [router]);
};
export default useIsAuthDone;

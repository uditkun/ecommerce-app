import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const routerInstance = useRouter();
  const router = useMemo(() => routerInstance, [routerInstance]);

  useEffect(() => {
    const loadingStart = () => {
      setLoading(true);
    };

    const loadingComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", loadingStart);

    router.events.on("routeChangeComplete", loadingComplete);

    return () => {
      router.events.off("routeChangeStart", loadingStart);
      router.events.off("routeChangeComplete", loadingComplete);
    };
  }, [router.events]);

  return (
    <div
      className={
        loading
          ? "h-full w-full absolute bg-white z-40 flex justify-center items-center"
          : "hidden"
      }
    >
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

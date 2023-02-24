import React, { MouseEvent, MouseEventHandler, useEffect } from "react";

const useMenuToggle = (ref: React.RefObject<HTMLElement>, id: string) => {
  //   useEffect for adding click event
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      document.querySelector(`#${id}`)?.classList.add("invisible");
      if (ref.current?.contains(e.target)) {
        document.querySelector(`#${id}`)?.classList.remove("invisible");
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, id]);
};

export default useMenuToggle;

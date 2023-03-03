import { useState } from "react";

const useSnackBar = () => {
  const [snackBar, setSnackBar] = useState({});
  return [snackBar, setSnackBar];
};

export default useSnackBar;

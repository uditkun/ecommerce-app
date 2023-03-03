import { useGlobalState } from "./Context";
const Snackbar = ({ customCSS }: { customCSS?: string }) => {
  const {
    snackBar: { snackBar },
  } = useGlobalState();

  switch (snackBar.type) {
    case "success": {
      return (
        <div
          className={
            customCSS
              ? "absolute top-16 left-1/2 px-4 py-2 max-w-md mx-2 bg-green-700 text-white" +
                customCSS
              : "absolute top-16 left-1/2 px-4 py-2 max-w-md mx-2 bg-green-700 text-white"
          }
        >
          {snackBar.message}
        </div>
      );
    }
    default: {
      return (
        <div
          className={
            customCSS
              ? "absolute top-16 left-1/2 px-4 py-2 max-w-md mx-2 bg-red-700 text-white" +
                customCSS
              : "absolute top-16 left-1/2 px-4 py-2 max-w-md mx-2 bg-red-700 text-white"
          }
        >
          {snackBar.message}
        </div>
      );
    }
  }
};

export default Snackbar;

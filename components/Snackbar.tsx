const Snackbar = ({
  message,
  customCSS,
  type,
}: {
  message: string;
  customCSS?: string;
  type?: string;
}) => {
  switch (type) {
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
          {message}
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
          {message}
        </div>
      );
    }
  }
};

export default Snackbar;

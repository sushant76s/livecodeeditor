import React from "react";
import { Toaster } from "react-hot-toast";

const ToastReact = () => {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed99",
              },
            },
          }}
        ></Toaster>
      </div>
    </>
  );
};

export default ToastReact;

import React, { lazy, Suspense } from "react";

// Tailwind CSS Spinner
const TailwindSpinner = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-gray-800"></div>
  </div>
);

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <TailwindSpinner />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------
export const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
export const CreateRoomPage = Loadable(
  lazy(() => import("../pages/CreateRoomPage"))
);
export const RoomPage = Loadable(lazy(() => import("../pages/RoomPage")));
export const AuthPage = Loadable(lazy(() => import("../pages/AuthPage")));

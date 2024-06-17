import { Navigate, useRoutes } from "react-router-dom";
import { INITIAL_PATH } from "../config-global";
import {
  HomePage,
  RoomPage,
  EditorPage,
  LoginPage,
  SignupPage,
} from "./elements";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <HomePage />,
      //   children: [
      //     { element: <Navigate to={INITIAL_PATH} replace />, index: true },
      //     { path: "login", element: <LoginPage /> },
      //     { path: "editor", element: <EditorPage /> },
      //   ],
    },
    {
      path: "/room",
      element: <RoomPage />,
    },
    {
      path: "/room/:roomId",
      element: <EditorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ]);
}

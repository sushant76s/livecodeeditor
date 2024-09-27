import { Navigate, useRoutes } from "react-router-dom";
import { INITIAL_PATH } from "../config-global";
import {
  HomePage,
  CreateRoomPage,
  RoomPage,
  LoginPage,
  SignupPage,
} from "./elements";
import { useAuth } from "../authentication/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isGuest, authToken } = useAuth();
  return authToken && !isGuest ? (
    children
  ) : (
    <Navigate to={INITIAL_PATH.login} />
  );
};

export default function Router() {
  return useRoutes([
    {
      path: INITIAL_PATH.root,
      element: <HomePage />,
      //   children: [
      //     { element: <Navigate to={INITIAL_PATH} replace />, index: true },
      //     { path: "login", element: <LoginPage /> },
      //     { path: "editor", element: <EditorPage /> },
      //   ],
    },
    {
      path: INITIAL_PATH.login,
      element: <LoginPage />,
    },
    {
      path: INITIAL_PATH.singup,
      element: <SignupPage />,
    },
    {
      path: INITIAL_PATH.createRoom,
      element: (
        // <ProtectedRoute>
        <CreateRoomPage />
        // </ProtectedRoute>
      ),
    },
    {
      path: INITIAL_PATH.room,
      element: (
        // <ProtectedRoute>
        <RoomPage />
        // </ProtectedRoute>
      ),
    },
  ]);
}

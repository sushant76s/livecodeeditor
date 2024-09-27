import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./authentication/AuthContext";
import ToastReact from "./components/ToastReact";

function App() {
  return (
    <>
      <ToastReact />
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

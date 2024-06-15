import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ToastReact from "./components/ToastReact";

function App() {
  return (
    <>
      <ToastReact />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;

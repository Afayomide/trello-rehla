import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import TaskHistory from "./components/history/history";
import { ModalProvider } from "./components/globalContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ModalProvider>
      {" "}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#ffd79f",
            color: "#00000",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<TaskHistory/>} />

      </Routes>
    </ModalProvider>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/NavBar/Navbar";
import Landing from "./pages/Landing";
// Layout Component
const Layout = () => (
  <>
    <Navbar />
    <Outlet /> 
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="admin" element={<Outlet />}>
          </Route>
          <Route path="user" element={<Outlet />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


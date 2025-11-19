import './App.css'
import HeroSection from './components/heroSection/HeroSection'
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from './components/NavBar/Navbar';
import InputFields from './components/InputFields/InputFields';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

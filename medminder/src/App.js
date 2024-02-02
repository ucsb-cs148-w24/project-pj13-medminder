import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home"
import Dasboard from "./pages/dashboard.js"

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dasboard />} />
    </Routes>
  
    </div>
  );
}

export default App;

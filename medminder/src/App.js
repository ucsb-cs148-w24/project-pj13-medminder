
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home"
import Dashboard from "./pages/dashboard.js"
import ProtectedRoute from './components/LoginProtectedRoute.jsx';


function App() {
  return (
    <div className="App" style={{ 
      backgroundSize: 'cover',
      backgroundPosition: 'center 250px', 
      height: '100vh',
      width: '100vw'
    }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

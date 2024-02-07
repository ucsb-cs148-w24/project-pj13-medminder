
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home"
import Dashboard from "./pages/dashboard.js"
import ProtectedRoute from './components/LoginProtectedRoute.jsx';


function App() {
  return (
    <div className="App">
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

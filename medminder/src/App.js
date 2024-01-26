import './App.css';
import AddEventButton from './components/AddEventButton';
import SignIn from "./components/SignIn";
import AlertPopup from "./components/AlertPopup/AlertPopup.jsx"

function App() {
  return (
    <div className="App">
      <SignIn />
      <AddEventButton />
      <AlertPopup />
    </div>
  );
}

export default App;

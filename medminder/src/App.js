import './App.css';
import SignIn from "./components/SignIn";
import AlertPopupWithButton from "./components/AlertPopupWithButton/AlertPopupWithButton.jsx"

function App() {

  return (
    <div className="App">
      <SignIn />
      <AlertPopupWithButton/>
    </div>
  );
}

export default App;

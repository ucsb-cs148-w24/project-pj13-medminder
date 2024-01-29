import './App.css';
import SignIn from "./components/SignIn";
import AlertPopupWithButton from "./components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import SimpleDataSender from "./components/StoreTestData";

function App() {

  return (
    <div className="App">
      <SignIn />
      <AlertPopupWithButton/>
      <SimpleDataSender />
    </div>
  );
}

export default App;

import './App.css';
import SignIn from "./components/SignIn";
import AlertPopupWithButton from "./components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import Display from "./components/data-show";
import SimpleDataSender from "./components/StoreTestData";

function App() {

  return (
    <div className="App">
      <SignIn />
      <AlertPopupWithButton/>
      <SimpleDataSender />
      <Display/>
    </div>
  );
}

export default App;

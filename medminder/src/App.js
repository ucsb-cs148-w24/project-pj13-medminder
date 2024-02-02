import './App.css';
import SignIn from "./components/SignIn";
import AlertPopupWithButton from "./components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import Display from "./components/data-show";
import SimpleDataSender from "./components/StoreTestData";
import DateNavigator from "./components/SetDateOnMain.jsx"

function App() {

  return (
    <div className="App">
      <SignIn />
      <AlertPopupWithButton/>
      <SimpleDataSender />
      <DateNavigator />

      <Display/>
    </div>
  );
}

export default App;

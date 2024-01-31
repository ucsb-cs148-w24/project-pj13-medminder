import './App.css';
import AddEventButton from './components/AddEventButton';
import SignIn from "./components/SignIn";
import Display from "./components/data-show";
import SimpleDataSender from "./components/StoreTestData";
import AlertPopup from "./components/AlertPopup/AlertPopup.jsx"
import DateNavigator from "./components/SetDateOnMain.jsx"

function App() {
  return (
    <div className="App">
      <SignIn />
      <AddEventButton />
      <SimpleDataSender />
      <DateNavigator />
      <AlertPopup />

      <Display/>
    </div>
  );
}

export default App;

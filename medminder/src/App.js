import './App.css';
import AddEventButton from './components/AddEventButton';
import SignIn from "./components/SignIn";
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

    </div>
  );
}

export default App;

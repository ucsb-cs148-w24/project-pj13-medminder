import './App.css';
import AddEventButton from './components/AddEventButton';
import SignIn from "./components/SignIn";
import SimpleDataSender from "./components/StoreTestData";
import AlertPopup from "./components/AlertPopup/AlertPopup.jsx"

function App() {
  return (
    <div className="App">
      <SignIn />
      <AddEventButton />
      <AlertPopup />
      <SimpleDataSender />
    </div>
  );
}

export default App;

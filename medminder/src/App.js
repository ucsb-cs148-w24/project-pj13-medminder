import './App.css';
import AddEventButton from './components/AddEventButton';
import SignIn from "./components/SignIn";
import Display from "./components/data-show";
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleDataSender from "./components/StoreTestData";
import AlertPopup from "./components/AlertPopup/AlertPopup.jsx"

function App() {
  return (
    <div className="App">
      <SignIn />
      <AddEventButton />
      <AlertPopup />
      <SimpleDataSender />
      <Display/>
    </div>
  );
}

export default App;

import './App.css';
import SignIn from "./components/SignIn";
import AlertPopupWithButton from "./components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import Display from "./components/data-show";
import SimpleDataSender from "./components/StoreTestData";
import DateNavigator from "./components/SetDateOnMain.jsx"
import MedicationReminder from './components/MedicationReminder.jsx';


function App() {

  return (
    <div className="App">
      <SignIn />
      <AlertPopupWithButton/>
      <SimpleDataSender />
      <DateNavigator />
      
      <Display/>

      <MedicationReminder/>
    </div>
  );
}

export default App;

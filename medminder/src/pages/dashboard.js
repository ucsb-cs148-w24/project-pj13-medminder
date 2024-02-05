import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import SimpleDataSender from "../components/StoreTestData.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx"
import { BrowserRouter, Navigate } from "react-router-dom";
import MedicationReminder from '../components/MedicationReminder.jsx';

function Dashboard() {

  return (
    <div className="Dasboard" >
      <AlertPopupWithButton/>
      <SimpleDataSender />
      <DateNavigator />
      <MedicationReminder/>
    </div>
  );
}

export default Dashboard;

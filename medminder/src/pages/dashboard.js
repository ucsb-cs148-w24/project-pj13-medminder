import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import SimpleDataSender from "../components/StoreTestData.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx"
import MedicationReminder from '../components/MedicationReminder.jsx';
import SignOut from "../components/SignOut.jsx";

import '../Dash-style.css';
function Dashboard() {

  return (
    <div className="Dasboard">
      <SignOut/>
       <div className="nav" >
       </div>
      <AlertPopupWithButton/>
      <SimpleDataSender />
      <DateNavigator />
      <MedicationReminder/>
    </div>
  );
}

export default Dashboard;

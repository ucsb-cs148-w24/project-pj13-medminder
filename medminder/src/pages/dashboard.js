import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import SimpleDataSender from "../components/StoreTestData.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx"
import MedicationReminder from '../components/MedicationReminder.jsx';
import SignOut from "../components/SignOut.jsx";

function Dashboard() {

  return (
    <div>
      <SignOut/>
      <div className="Dasboard" style={{textAlign: 'center', marginTop: '60px'}}>
        <DateNavigator />
        <AlertPopupWithButton/>
        <MedicationReminder/>
      </div>
    </div>
  );
}

export default Dashboard;

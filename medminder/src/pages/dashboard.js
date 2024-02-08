import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import DateNavigator from "../components/SetDateOnMain.jsx"
import MedicationReminder from '../components/MedicationReminder.jsx';
import SignOut from "../components/SignOut.jsx";

import '../Dash-style.css';
function Dashboard() {

  return (
    <div>
      <SignOut/>
      <div className="nav" >
       </div>
      <div className="Dasboard" style={{textAlign: 'center', marginTop: '60px'}}>
        <DateNavigator />
        <AlertPopupWithButton TextInButton={"+"} buttonDesign={"button1"}/>
        <MedicationReminder/>
      </div>
    </div>
  );
}

export default Dashboard;

import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx";
import SignOut from "../components/SignOut.jsx";
import EmailToggle from "../components/EmailToggle.jsx"
import ProfileDropdown from '../components/ProfileDropdown.jsx';
import Settings from "../components/settings.jsx";
import '../Dash-style.css';

function Dashboard() {
  const new_user = localStorage.getItem("new_user")
  console.log(new_user)
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Medminder</h1> {}
        </div>
        <Settings />
        <SignOut />
      </header>
      <div className="nav">
        {/* Navigation content if any */}
        <ProfileDropdown/>
      </div>
      <div className="dashboard-main" style={{textAlign: 'center', marginTop: '60px'}}>
        <DateNavigator />
        <AlertPopupWithButton TextInButton={"+"} buttonDesign={"button1"}/>
        
      </div>
    </div>
  );
  }


export default Dashboard;

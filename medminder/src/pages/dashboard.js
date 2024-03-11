import React from 'react';
import { useTour } from '@reactour/tour'
import { FaRegQuestionCircle } from "react-icons/fa";
import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx";
import SignOut from "../components/SignOut.jsx";
import EmailToggle from "../components/EmailToggle.jsx"
import ProfileDropdown from '../components/ProfileDropdown.jsx';

import '../Dash-style.css';

function Dashboard() {
  const { setIsOpen } = useTour()

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Medminder</h1> {}
        </div>
        <EmailToggle />
        <button onClick={() => setIsOpen(true)}><FaRegQuestionCircle /></button>
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

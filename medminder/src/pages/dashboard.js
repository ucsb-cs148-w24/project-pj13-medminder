import React from 'react';
import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx";
import SignOut from "../components/SignOut.jsx";
import EmailToggle from "../components/EmailToggle.jsx"

import '../Dash-style.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Medminder</h1> {}
        </div>
        <EmailToggle />
        <SignOut />
      </header>
      <div className="nav">
        {/* Navigation content if any */}
      </div>
      <div className="dashboard-main" style={{textAlign: 'center', marginTop: '60px'}}>
        <DateNavigator />
        <AlertPopupWithButton TextInButton={"+"} buttonDesign={"button1"}/>
        
      </div>
    </div>
  );
}

export default Dashboard;

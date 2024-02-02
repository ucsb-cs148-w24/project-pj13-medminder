import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import Display from "../components/data-show.jsx";
import SimpleDataSender from "../components/StoreTestData.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx"
import { BrowserRouter, Navigate } from "react-router-dom";
function Dashboard() {

  return (
    <div className="Dasboard">
      <AlertPopupWithButton/>
      <SimpleDataSender />
      <DateNavigator />
      <Display/>
  
    </div>
  );
}

export default Dashboard;

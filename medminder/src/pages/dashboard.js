import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx"
import SimpleDataSender from "../components/StoreTestData.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx"
import { BrowserRouter, Navigate } from "react-router-dom";
function Dashboard() {

  return (
    <div className="Dasboard" >
      <AlertPopupWithButton/>
      <SimpleDataSender />
      <DateNavigator />  
    </div>
  );
}

export default Dashboard;

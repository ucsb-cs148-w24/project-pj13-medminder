import AlertPopupWithButton from "../components/AlertPopupWithButton/AlertPopupWithButton.jsx";
import DateNavigator from "../components/SetDateOnMain.jsx";
import SignOut from "../components/SignOut.jsx";
import ProfileDropdown from '../components/ProfileDropdown.jsx';
import Settings from "../components/settings.jsx";
import { useState } from "react";
import '../Dash-style.css';
import { getDatabase, get, ref, child } from "firebase/database";
import { useAuthContext } from '../components/AuthContext';


function Dashboard() {
  const new_user = localStorage.getItem("new_user");
  const auth = useAuthContext();
  const [sex, setSex] = useState("");
  const [age, setAge] = useState(0);
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const database = getDatabase();
  const userId = auth.currentUser.uid;
  const email = auth.currentUser.email;
  const dataRef = ref(database);

  get(child(dataRef, `Users/${userId}/UserInfo/Name`)).then((snapshot) => {
    if (snapshot.exists()) {
      setName(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });


  get(child(dataRef, `Users/${userId}/UserInfo/Age`)).then((snapshot) => {
    if (snapshot.exists()) {
        setAge(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

get(child(dataRef, `Users/${userId}/UserInfo/DOB`)).then((snapshot) => {
    if (snapshot.exists()) {
        setDob(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
get(child(dataRef, `Users/${userId}/UserInfo/Sex`)).then((snapshot) => {
    if (snapshot.exists()) {
        setSex(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
  console.log(new_user)


  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Medminder</h1> {}
        </div>
        <Settings name={name} age = {age} dob = {dob} sex = {sex} database={database} userId={userId} email={email}/>
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

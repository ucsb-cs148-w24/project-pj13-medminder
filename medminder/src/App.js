import './App.css';
import SignIn from "./components/SignIn";
import SimpleDataSender from "./components/StoreTestData";

function App() {
  return (
    <div className="App">
      <SignIn />
      <SimpleDataSender />
    </div>
  );
}

export default App;

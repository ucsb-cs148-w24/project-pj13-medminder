import './App.css';
import SignIn from "./components/SignIn";
import Display from "./components/data-show";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <SignIn/>
      <Display/>
    </div>
  );
}

export default App;
